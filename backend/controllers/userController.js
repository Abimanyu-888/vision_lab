import { User } from '../models/user.js'
import { auth } from '../config/firebase.js';

export async function createUser(req, res) {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }

        const idToken = authHeader.split(' ')[1];
        
        if (!idToken || idToken === 'undefined') {
             return res.status(401).json({ message: "Unauthorized: Malformed or missing token string" });
        }

        const decodedToken = await auth.verifyIdToken(idToken);
        const {
            uid,
            email,
            email_verified,
            name,
            picture,
        } = decodedToken;

        const existingUser = await User.findOne({ uid: uid })
        
        if (existingUser) {
            return res.status(200).json({
                message: "User already exists",
                user: existingUser
            });
        }

        const user = await User.create({
            uid,
            email,
            email_verified,
            name: name || "",
            picture: picture || ""
        })

        return res.status(201).json({
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        console.error("Auth Error:", error);
        const statusCode = error.code?.startsWith('auth/') ? 401 : 500;
        return res.status(statusCode).json({
            message: "Authentication failed",
            error: error.message
        });
    }
}

