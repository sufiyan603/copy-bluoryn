// Login API with email and password validation
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { email, password } = body;


        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }


        // Example: Authenticate user (Replace with actual logic)
        const isAuthenticated = email === "test@example.com" && password === "password123";


        if (!isAuthenticated) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }


        // If authentication is successful
        return NextResponse.json(
            { message: "Login successful", user: { email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}



