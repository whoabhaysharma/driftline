'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from '@/lib/firebase-client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignInPage() {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
                <p className="text-sm text-white opacity-80">
                    {isLogin ? 'Sign in to continue' : 'Get started with your account'}
                </p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
                <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg h-14 text-lg bg-white bg-opacity-10 border-none text-white placeholder:text-white placeholder:opacity-70"
                />
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg h-14 text-lg bg-white bg-opacity-10 border-none text-white placeholder:text-white placeholder:opacity-70"
                />
                <Button className="w-full bg-white text-blue-300 rounded-lg py-4 text-lg font-semibold hover:bg-opacity-90" type="submit" disabled={loading}>
                    {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
                </Button>
            </form>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white border-opacity-20" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white opacity-70">OR</span>
                </div>
            </div>
            <Button className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-20 text-white rounded-lg py-4 text-lg font-semibold" onClick={handleGoogleLogin} disabled={loading}>
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google logo"
                    className="w-6 h-6 mr-2"
                />
                {loading ? 'Logging in...' : 'Continue with Google'}
            </Button>
            <div className="text-center mt-8">
                <span className="text-sm text-white opacity-80">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                    type="button"
                    className="text-sm font-medium text-white hover:underline ml-1"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </div>
        </div>
    )
}