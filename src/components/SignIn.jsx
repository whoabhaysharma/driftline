'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { auth } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userInfo = await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "Success",
                description: "You've successfully logged in!",
            })

            const idToken = await userInfo.user.getIdToken()
            const resp = await axios.get('/api/auth/cookieToken', {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })

            if (resp.status === 200) {
                router.push("/")
            }

        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            const userInfo = await signInWithPopup(auth, provider)
            toast({
                title: "Success",
                description: "You've successfully logged in with Google!",
            })
            const idToken = await userInfo.user.getIdToken()
            const resp = await axios.get('/api/auth/cookieToken', {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })

            if (resp.status === 200) {
                router.push("/")
            }

            // Redirect or update UI state here
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" type="submit" onClick={handleLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button className="w-full" variant="outline" onClick={handleGoogleLogin} disabled={loading}>
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                            className="w-5 h-5 mr-2"
                        />
                        {loading ? 'Logging in...' : 'Login with Google'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}