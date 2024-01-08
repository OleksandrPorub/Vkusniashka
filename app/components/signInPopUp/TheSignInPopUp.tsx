"use client";

import React, { useEffect, useState } from "react";
import styles from "./TheSignInPopUp.module.scss";
import { signIn } from "next-auth/react";
import TheLoader from "../UI/loader/TheLoader";
import { useRouter, useSearchParams } from "next/navigation";
import TheCloserIcon from "../UI/closerIcon/TheCloserIcon";
import { AnimatePresence, motion } from "framer-motion";

const TheSignInPopUp = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    // const [isFormVisible, setIsFormVisible] = useState(false);

    // useEffect(()=>{
    //     setIsFormVisible(true);
    // },[])

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
        <AnimatePresence>
            <motion.div
                className={styles.underlay}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    opacity: 1,
                    type: "linear",
                }}
            >
                {
                    <motion.div
                        className={styles.content}
                        initial={{ y: -100, opacity: 0.6 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                            opacity: 1,
                            type: "spring",
                        }}
                    >
                        <button
                            className={styles.btn_closerIcon}
                            onClick={() => {
                                closer();
                            }}
                        >
                            <TheCloserIcon width={35} color={"white"}></TheCloserIcon>
                        </button>

                        <h3 className={styles.title}>
                            Якщо ви адміністратор - введіть облікові дані, <br /> інакше - закрийте це вікно, натиснувши на перехрестя.
                        </h3>
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
                    </motion.div>
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default TheSignInPopUp;
