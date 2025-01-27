import { verifyToken } from "@/lib/utils";
import { firestore } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Verify token and get user
        const decodedToken = await verifyToken(request);
        if (!decodedToken) {
            return NextResponse.json(
                { error: 'Unauthorized access' }, 
                { status: 401 }
            );
        }

        // Get user document
        const user = await getUserDocument(decodedToken.uid);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' }, 
                { status: 404 }
            );
        }

        // Get vehicles for user
        const vehicles = await getUserVehicles(user.ref);
        return NextResponse.json(
            { data: vehicles }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        );
    }
}

async function getUserDocument(uid) {
    const usersRef = firestore.collection("users");
    const userSnapshot = await usersRef
        .where("uid", "==", uid)
        .limit(1)
        .get();
    
    return userSnapshot.empty ? null : userSnapshot.docs[0];
}

async function getUserVehicles(userRef) {
    const vehicleRef = firestore.collection('vehicles');
    const vehiclesSnapshot = await vehicleRef
        .where('owner', '==', userRef)
        .get();

    return vehiclesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
