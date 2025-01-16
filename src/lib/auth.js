import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { firestore } from "./firebase-admin"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const querySnapshot = await firestore
                    .collection("users")
                    .where("email", "==", credentials.email)
                    .where("password", "==", credentials.password)
                    .limit(1)
                    .get()

                if (querySnapshot.empty) {
                    console.log("No matching documents found.");
                    return null;
                }

                const doc = querySnapshot.docs[0];
                const data = doc.data();
                const struct = { password: data.password, ...data };
                return { ...data }
            },
        }),
    ],
    session: "jwt",
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.email = user.email
                token.mobile_number = user.mobile_number
            }
            console.log(token, 'TOKENNNNN')
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            session.user.email = token.email
            return session
        },
    },
    secret: process.env.SECRET,
})