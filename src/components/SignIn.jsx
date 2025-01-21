'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { auth } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const { toast } = useToast()
    const router = useRouter()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let userInfo
            if (isLogin) {
                userInfo = await signInWithEmailAndPassword(auth, email, password)
                toast({
                    title: "Success",
                    description: "You've successfully logged in!",
                })
            } else {
                userInfo = await createUserWithEmailAndPassword(auth, email, password)
                toast({
                    title: "Success",
                    description: "You've successfully signed up!",
                })
            }

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
                    <CardDescription>
                        {isLogin ? 'Enter your credentials to access your account' : 'Create a new account to get started'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAuth}>
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
                        <Button className="w-full mt-4" type="submit" disabled={loading}>
                            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" variant="outline" onClick={handleGoogleLogin} disabled={loading}>
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                            className="w-5 h-5 mr-2"
                        />
                        {loading ? 'Logging in...' : 'Continue with Google'}
                    </Button>
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            type="button"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}