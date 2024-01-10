"use client";

import Link from "next/link";
import styles from "./TheNavigation.module.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import imgLogoSrc from "../../../public/images/vkusniaski-logo.png";

const navigation = [
    // {
    //     id: 1,
    //     title: "Домашня",
    //     path: "/",
    // },
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
        title: "admin Асортимент",
        path: "/admin-assortment",
    },
    {
        id: 5,
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
                <li>
                    <Link className={styles.nav_item + (pathname === "/" ? ` ${styles.active}` : "")} href={"/"}>
                        <Image src={imgLogoSrc} width={100} height={60} alt="logo"></Image>
                    </Link>
                </li>
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
