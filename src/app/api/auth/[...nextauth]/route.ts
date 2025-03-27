import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { generateUniqueUsername } from "../../../../../lib/utils";
import LinkedIn, { LinkedInProfile } from "next-auth/providers/linkedin";

const prisma = new PrismaClient();

// Custom Prisma adapter to give a username to new users
const adapter = {
    ...PrismaAdapter(prisma),
    createUser: async (data: any) => {
        const baseName = data.name?.split(" ")[0]?.toLowerCase() || "user";
        const username = await generateUniqueUsername(baseName);

        // Create the user with the generated username
        return prisma.user.create({
            data: {
                ...data,
                username,
            },
        });
    },
};

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
            client: { token_endpoint_auth_method: "client_secret_post" },
            issuer: "https://www.linkedin.com",
            profile: (profile: LinkedInProfile) => ({
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }),
            wellKnown:
                "https://www.linkedin.com/oauth/.well-known/openid-configuration",
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: JWT }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin", // TODO - Build the UI
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };