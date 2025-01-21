import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
    return (
        <div>
            <h1>Hello World</h1>
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