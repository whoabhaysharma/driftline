import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { verifySessionCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
    const cookieStore = await cookies(); // Access cookies
    const sessionToken = cookieStore.get('session'); //

    const decodedToken = await verifySessionCookie(sessionToken?.value);

    if (!decodedToken) {
        return redirect('/login')
    }
    return (
        <>
            <Header/>
            <div className="px-3 py-16">
                {children}
            </div>
            <BottomNavigation />
        </>
    );
}