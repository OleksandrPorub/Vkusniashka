"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import TheNavigation from "../navigation/TheNavigation";
import styles from "./TheHeader.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import imgLogoSrc from "../../../public/images/vkusniaski-logo.png";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const currentPath = usePathname();

    return (
        <div className={styles.header}>
            {/* <Image src={imgLogoSrc} width={90} height={60} alt="logo"></Image> */}
            <section className={styles.mainSection}>
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
                            router.push(`/signIn?callbackUrl=${currentPath}`);
                        }}
                        title={"вхід для адміна"}
                    >
                        вхід для адміна
                    </button>
                )}
            </section>
            <section className={styles.navSection}>
                <TheNavigation></TheNavigation>
            </section>
        </div>
    );
}

export default Header;
