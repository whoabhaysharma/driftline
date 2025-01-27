import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { auth } from "./firebase-admin";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function verifyToken(request){
  const { cookies } = request;
  const sessionCookie = cookies.get('session')?.value;
  if (!sessionCookie) {
    return null;
  }

  try{
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true /** checkRevoked */)
    return decodedToken;
  }catch(e){
    return null
  }
}