import jwt from "jsonwebtoken";
import { errorhandler } from "../utils/error.js";   

export const verifyUser = (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) return next(errorhandler(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
        if (err) return next(errorhandler(403, "Forbidden"));
        req.user = decodedUser;
        next();
    });
}