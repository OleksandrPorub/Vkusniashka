"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import TheNavigation from "../navigation/TheNavigation";
import styles from "./TheHeader.module.scss";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const currentPath = usePathname();

    return (
        <div className={styles.header}>
            <TheNavigation></TheNavigation>
            {session ? (
                <button
                    className={styles.btn_signIn}
                    onClick={() => {
                        signOut({ callbackUrl: "/" });
                    }}
                    title={"розлогінутись"}
                >
                    адміністратор
                </button>
            ) : (
                <button
                    className={styles.btn_signIn}
                    onClick={() => {
                        // signIn("Credentials");
                        router.push(`/signIn?callbackUrl=${currentPath}`)
                    }}
                    title={"вхід для адміна"}
                >
                    вхід для адміна
                </button>
            )}
        </div>
    );
}

export default Header;
