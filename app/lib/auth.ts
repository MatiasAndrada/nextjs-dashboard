import type { NextAuthConfig } from "next-auth";
import { sendVerificationRequest } from "@/app/lib/actions"
import { EmailProvider } from "next-auth/providers/email";

export type sendVerificationRequest = {
    identifier: string;
    url: string;
    provider: EmailProvider;
};


export const authOptions: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [
        {
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                }
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest([

            ])
        }

    ]
};

/*
!FORMAS DE RECUPERAR LA SESIÓN DEL USUARIO
?Sesión en un componente del servidor
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function Home() {
    const session = await getServerSession(authOptions);
    return <div>{JSON.stringify(session)}
?Obtener la sesión en una ruta API
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,
        session});
}
?Obtener la sesión en un componente del cliente
*Debemos crear el componente NextAuthProvider
?provider
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};
?componente
import { NextAuthProvider } from "./providers";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <html lang="en">
        <body>
        <NextAuthProvider>{children}</NextAuthProvider>
        </body>
    </html>
    );
}


*/