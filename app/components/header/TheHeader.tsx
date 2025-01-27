"use client";

import { signOut, useSession } from "next-auth/react";
import TheNavigation from "../navigation/TheNavigation";
import styles from "./TheHeader.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import imgLogoSrc from "../../../public/images/vkusniaski-logo.png";
import Link from "next/link";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const currentPath = usePathname();

    return (
        <div className={styles.header}>
            <section className={styles.mainSection}>
                <div className={styles.mainSection_left}>
                    {" "}
                    {session ? (
                        <button
                            className={styles.btn_signIn}
                            onClick={() => {
                                signOut({ callbackUrl: "/" });
                            }}
                            title={"розлогінутись"}
                        >
                            вихід
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
                            адмін
                        </button>
                    )}
                </div>
                <div className={styles.mainSection_centr}>
                    <Link className={styles.linkHome} href="/">
                        <Image className={styles.logo} src={imgLogoSrc} height={48} alt="logo"></Image>
                    </Link>
                </div>
                <div className={styles.mainSection_right}>
                    <Link className={styles.linkOrder} href="/contacts">
                        ЗАМОВИТИ
                    </Link>
                </div>
            </section>
            <section className={styles.navSection}>
                <TheNavigation></TheNavigation>
            </section>
        </div>
    );
}

export default Header;
