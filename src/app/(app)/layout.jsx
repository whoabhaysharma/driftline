import BottomNavigation from "@/components/BottomNavigation";
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
            <div className="p-2">
                {children}
            </div>
            <BottomNavigation />
        </>
    );
}