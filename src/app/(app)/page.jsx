import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
    return (
        <form
            action={async () => {
                "use server"
                const cookieStore = await cookies()
                cookieStore.delete('session')
                redirect('/login')
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}