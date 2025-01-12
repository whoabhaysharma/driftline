import { getAuthStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
    const { loggedIn } = getAuthStatus();

    if (!loggedIn) {
        redirect('/login')
    }

    return children;
}