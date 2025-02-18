"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Appbar = () => {
    const { data: session } = useSession();

    console.log("Session Data:", session); // Debugging

    return (
        <div>
            <button onClick={() => signIn()}>Signin</button>
            <button onClick={() => signOut()}>Sign out</button>
            <div>
                <h1>Hello</h1>
                {session?.user ? (
                    <p>
                        Welcome, {session.user.name || session.user.email}! 
                        You are a <b>{session.user.role}</b> user.
                    </p>
                ) : (
                    <p>You are not signed in.</p>
                )}
            </div>
        </div>
    );
};

export default Appbar;
