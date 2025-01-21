import { Switch } from "@/components/ui/switch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
    return (
        <div>
            <h1 className="text-3xl font-medium">Hi, Nilesh!</h1>
            <Switch id="airplane-mode" />
            <div className="w-full flex justify-between items-center">
                <h1 className="text-5xl font-semibold">₹1,244</h1>
            </div>
            <form action={async () => {
                'use server';
                cookies().delete("session");
                redirect("/login");
            }}>
                <button type="submit">Sign out</button>
            </form>
        </div>
    );
}