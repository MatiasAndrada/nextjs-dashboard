import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";



export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        }),
        Google,
        Github

    ],
} satisfies NextAuthConfig