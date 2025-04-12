import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          });
        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });

    }
    
}