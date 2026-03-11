import { db } from '$lib/server/db';
import {sql} from 'drizzle-orm';
import {validateSessionToken} from "@/server/auth";
import type {LayoutServerLoad} from "../../.svelte-kit/types/src/routes/$types";
import {redirect} from "@sveltejs/kit";
import {users} from "@/server/db/schema/users";

export const load: LayoutServerLoad = async ({ cookies, url }) => {

    const publicRouteRegex = /^\/(login|register)/i;
    const isPublicPage = publicRouteRegex.test(url.pathname)

    const sessionToken = cookies.get('session_token')

    if (!sessionToken) {
        if (!isPublicPage){
            redirect(307, '/login')
        }
        return {user : null}
    }

    const session = await validateSessionToken(sessionToken)



    if (session === null) {
        cookies.delete('session_token', { path: '/' });
        redirect(307, '/login');
    }else{
        redirect(301, '/home');
    }

    const [user] = await db.select().from(users).where(sql`${users.id} = ${session.userId}`).limit(1)
    return {
        user: user ?? null,
        session : session
    }

};