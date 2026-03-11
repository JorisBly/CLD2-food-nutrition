import {db} from "@/server/db";
import {sessions} from "@/server/db/schema/sessions";
import {sql} from "drizzle-orm";
import {type Session, SessionWithToken, type User} from "@/types";
import type {Cookies} from "@sveltejs/kit";


const sessionExpiresInSeconds = 60 * 60 * 24

export function generateSecureRandomString(): string {
    // Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
    const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

    // Generate 24 bytes = 192 bits of entropy.
    // We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);

    let id = "";
    for (let i = 0; i < bytes.length; i++) {
        // >> 3 "removes" the right-most 3 bits of the byte
        id += alphabet[bytes[i] >> 3];
    }
    return id;
}

export async function createSession(user: User): Promise<string> {

    const secret = generateSecureRandomString()
    const secretHash = await hashSecret(secret);

   const newSession = await db.insert(sessions).values({
        secretHash: secretHash,
        userId: user.id,
    }).returning({
       sessionId: sessions.id
   })

    const token: string = newSession[0].sessionId + "." + secret

    return token
}

async function hashSecret(secret: string): Promise<Uint8Array> {
    const secretBytes = new TextEncoder().encode(secret);
    const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
    return new Uint8Array(secretHashBuffer);
}


export async function validateSessionToken(token: string): Promise<Session | null> {
    const tokenParts = token.split(".")
    if (tokenParts.length !== 2) {
        return null;
    }
    const sessionId = tokenParts[0]
    const sessionSecret = tokenParts[1]

    const session: Session | null = await getSessionBySessionId(sessionId);
    if (!session) {
        return null
    }

    const tokenSecretHash = await hashSecret(sessionSecret);
    const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
    if (!validSecret) {
        return null;
    }

    return session;
}

export async function getSessionByUserId(userId: string): Promise<Session | null> {
    const now = new Date()

    const result: Session[] = await db.select()
        .from(sessions)
        .where(sql`${sessions.userId} = ${userId}`)

    if (result.length === 0) {
        return null
    }

    const session: Session = result[0]



    const expired = await checkExpiration(now, session, userId)

    if (expired) {
        return null
    }

    return session
}

export async function getSessionBySessionId(sessionId: string): Promise<Session | null> {
    const now = new Date()

    const result: Session[] = await db.select()
        .from(sessions)
        .where(sql`${sessions.id} = ${sessionId}`)

    if (result.length === 0) {
        return null
    }

    const session: Session = result[0]



    const expired = await checkExpiration(now, session)

    if (expired) {
        return null
    }

    return session
}

async function deleteSession(sessionId: string): Promise<void> {
    await db.delete(sessions).where(sql`${sessions.id} = ${sessionId}`);
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    let c = 0;
    for (let i = 0; i < a.byteLength; i++) {
        c |= a[i] ^ b[i];
    }
    return c === 0;
}

export async function createCookie(cookies: Cookies, token: string){

    cookies.set('session_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 86400 secondes
    });

}

export function getCookies(cookies: Cookies) {
    const token = cookies.get('session_token');

    if (!token) {
        return false
    }else{
        return true
    }
}

async function checkExpiration(now:Date, session: Session){
    if (now.getTime() - session.created_at >= sessionExpiresInSeconds * 1000) {
        await deleteSession(session.id);
        return true
    }
}