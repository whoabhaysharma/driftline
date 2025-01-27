import { firestore } from "@/lib/firebase-admin";

const VehicleService = {
    getByOwner: async (userRef) => {
        const snapshot = await firestore.collection('vehicles')
            .where('owner', '==', userRef)
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    create: async (data) => {
        const ref = firestore.collection('vehicles').doc();
        await ref.set({ ...data, created_at: new Date(), updated_at: new Date() });
        return ref.id;
    },

    delete: async (vehicleId) => {
        const ref = firestore.collection('vehicles').doc(vehicleId);
        await ref.delete();
    },

    update: async (vehicleId, data) => {
        const ref = firestore.collection('vehicles').doc(vehicleId);
        await ref.update({ ...data, updated_at: new Date() });
    },

    getById: async (vehicleId) => {
        const ref = firestore.collection('vehicles').doc(vehicleId);
        const doc = await ref.get();
        return doc.exists ? doc : null;
    }
};

export default VehicleService;