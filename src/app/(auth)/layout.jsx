import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
    const session = await auth()
    console.log(session, 'SESSION')
    if (session) {
        redirect('/')
    }
    return children;
}