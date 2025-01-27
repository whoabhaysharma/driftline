import { firestore } from "@/lib/firebase-admin";

// Service modules
const UserService = {
    getUser: async (uid) => {
        const snapshot = await firestore.collection("users")
            .where("uid", "==", uid)
            .limit(1)
            .get();
        return snapshot.empty ? null : snapshot.docs[0];
    }
};

export default UserService;