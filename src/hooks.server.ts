// import {type Handle, type HandleServerError, redirect} from '@sveltejs/kit';
// import {validateSessionToken} from "@/server/auth.ts";
// import {db} from "@/server/db";
// import {users} from "@/server/db/schema";
// import {sql} from "drizzle-orm";
//
// export const handle: Handle = async ({ event, resolve }) => {
//
//     const sessionToken = event.cookies.get('session_token')
//     const isAuthPage = event.url.pathname.includes('login') ||
//         event.url.pathname.includes('register')
//
//         if (!sessionToken) {
//             if (!isAuthPage) {
//                 throw redirect(307, '/login');
//             }
//             return await resolve(event);
//
//         }else{
//             const session = await validateSessionToken(sessionToken)
//
//             if (session === null) {
//                 event.cookies.delete('session_token', { path: '/' });
//                 redirect(307, '/login')
//
//                 event.locals.user = null
//
//                 return await resolve(event);
//             }
//
//             const [user] = await db.select({
//                     id: users.id,
//                     firstName: users.firstName,
//                     lastName: users.lastName,
//                     email: users.email,
//                     createdAt: users.created_at,
//                 }
//             ).from(users).where(sql`${users.id} = ${session.userId}`).limit(1)
//
//             event.locals.user = user ?? null
//
//         }
//     return await resolve(event);
//
// };
