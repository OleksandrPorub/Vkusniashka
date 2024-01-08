"use client";

import React, { useState } from "react";
import styles from "./TheSignInPopUp.module.scss";
import { signIn } from "next-auth/react";
import TheLoader from "../UI/loader/TheLoader";
import { useRouter, useSearchParams } from "next/navigation";
import TheCloserIcon from "../UI/closerIcon/TheCloserIcon";


const TheSignInPopUp = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const closer = () => {
        router.push(callbackUrl);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);       
        const res = await signIn("credentials", {
            login: formData.get("login"),
            password: formData.get("password"),
            redirect: false,
        });
        setIsLoading(false);
        if (res && !res.error) {
            closer();
        }
    };

    return (
        <div className={styles.underlay}>
            <div className={styles.content}>
                <button
                    className={styles.btn_closerIcon}
                    onClick={() => {
                        closer();
                    }}
                >
                    <TheCloserIcon width={35} color={"white"}></TheCloserIcon>
                </button>

                <h3 className={styles.title}>Якщо ви адміністратор - введіть дані, інакше - закрийте це вікно натиснувши на перехрестя.</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        логін:
                        <input name="login" type="text" />
                    </label>
                    <label>
                        пароль:
                        <input name="password" type="text"></input>
                    </label>
                    {isLoading ? (
                        <TheLoader></TheLoader>
                    ) : (
                        <button className={styles.btn_submit} type="submit">
                            авторизуватись
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default TheSignInPopUp;
