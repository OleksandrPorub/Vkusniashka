"use client";

import { signOut, useSession } from "next-auth/react";
import TheNavigation from "../navigation/TheNavigation";
import styles from "./TheHeader.module.scss";
import { useRouter } from "next/navigation";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className={styles.header}>
            <TheNavigation></TheNavigation>
            {session ? (
                <button
                    className={styles.btn_signIn}
                    onClick={() => {
                        signOut({ callbackUrl: "/" });
                    }}
                >
                    адміністратор
                </button>
            ) : (
                <button
                    className={styles.btn_signIn}
                    onClick={() => {
                        router.push("/api/auth/signin");
                    }}
                >
                    відвідувач
                </button>
            )}
        </div>
    );
}

export default Header;
