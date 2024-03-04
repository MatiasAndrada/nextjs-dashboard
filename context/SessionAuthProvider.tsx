

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = {
    children?: React.ReactNode;
};

export default async function NextAuthProvider({ children }: Props) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}