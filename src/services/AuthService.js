import { verifyToken } from "@/lib/utils";
import UserService from "./UserService";

const AuthService = {
    verifyUser: async (request) => {
        const decodedToken = await verifyToken(request);
        if (!decodedToken) return null;

        const user = await UserService.getUser(decodedToken.uid);
        return user || null;
    }
};

export default AuthService