import { auth } from "./firebase-admin";

export const verifySessionCookie = async (sessionToken) => {
    if(!sessionToken) {
        return null;
    }

    return await auth.verifySessionCookie(sessionToken, true);
}