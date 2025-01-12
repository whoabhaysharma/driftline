import app from "../../../../config/firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export async function GET(request) { 
    try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const users = usersSnapshot.docs.map(doc => doc.data());
        return Response.json({ data: users });
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

export async function POST(request) { 
    try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');
        const newUser = {
            name: 'John Doe',
            email: 'abhay@gmail.com'
        }
    
        await addDoc(usersCollection, newUser);
        return Response.json({ message: 'User added successfully' });
    }catch (error) {
        return Response.json({ error: error.message });
    }
}