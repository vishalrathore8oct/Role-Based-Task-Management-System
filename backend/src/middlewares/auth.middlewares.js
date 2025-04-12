import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    let token = null

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
}