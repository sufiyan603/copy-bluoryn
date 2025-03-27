"use server";


import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { authenticateToken } from "../middleware/auth"; // Middleware for protecting routes (commented out for now)


const SECRET_KEY = process.env.JWT_SECRET || "SECRET_KEY";


export async function login(email: string, password: string) {
    try {
        const normalizedEmail = email.toLowerCase().trim(); // Normalize email to prevent duplicates due to case sensitivity


        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });


        if (!user || !user.password) {
            return { error: "Invalid credentials" };
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const failedAttempts = user.failedAttempts + 1;
            let lockUntil = null;


            if (failedAttempts >= 3) {
                lockUntil = new Date();
                lockUntil.setDate(lockUntil.getDate() + 3); // Lock account for 3 days after 3 failed attempts
            }


            await prisma.user.update({
                where: { id: user.id },
                data: { failedAttempts, lockUntil },
            });


            return { error: "Invalid credentials" };
        }


        // Reset failed attempts on successful login
        await prisma.user.update({
            where: { id: user.id },
            data: { failedAttempts: 0, lockUntil: null },
        });


        // Generate JWT Token for authentication
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );


        return { message: "Login successful", token }; // Return JWT token instead of plain success response
    } catch (error) {
        return { error: "Internal server error" };
    }
}
