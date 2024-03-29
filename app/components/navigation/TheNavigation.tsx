"use client";

import Link from "next/link";
import styles from "./TheNavigation.module.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const navigation = [
    {
        id: 1,
        title: "Головна",
        path: "/",
    },
    {
        id: 2,
        title: "Асортимент",
        path: "/assortment",
    },
    {
        id: 3,
        title: "Меню",
        path: "/menuToday",
    },
    {
        id: 4,
        title: "Контакти",
        path: "/contacts",
    },
    {
        id: 5,
        title: "admin Асортимент",
        path: "/admin-assortment",
    },
    {
        id: 6,
        title: "admin Меню",
        path: "/admin-menuToday",
    },
];

const TheNavigation = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <nav className={styles.nav}>
            <ul>
                {navigation.map(
                    (item) =>
                        !(!session && item.path.includes("admin")) && (
                            <li key={item.id}>
                                <Link className={styles.nav_item + (pathname === item.path ? ` ${styles.active}` : "")} href={item.path}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </nav>
    );
};

export default TheNavigation;
