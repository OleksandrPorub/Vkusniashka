"use client";

import React, { useState } from "react";
import styles from "./TheSignInPopUp.module.scss";
import { signIn } from "next-auth/react";
import TheLoader from "../UI/loader/TheLoader";
import { useRouter, useSearchParams } from "next/navigation";
import TheCloserIcon from "../UI/closerIcon/TheCloserIcon";
import { motion } from "framer-motion";

const TheSignInPopUp = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    // const [elem_underlay, setElem_underlay]: [Element | null, Function] = useState(null);
    // const [elem_content, setElem_content]: [Element | null, Function] = useState(null);

    // useEffect(() => {
        // const elem_underlay = document.getElementsByClassName(styles.underlay)[0];
        // const elem_content = document.getElementsByClassName(styles.content)[0];
        // setElem_underlay(document.getElementsByClassName(styles.underlay)[0]);
        // setElem_content(document.getElementsByClassName(styles.content)[0]);
        // if (elem_underlay) {
        //     elem_underlay.classList.add(styles.appear);
        // }
        // if (elem_content) {
        //     elem_content.classList.add(styles.appear);
        // }
        // return()=>{
        //     if (elem_underlay) {
        //         elem_underlay.classList.remove(styles.appear);
        //     }
        //     if (elem_content) {
        //         elem_content.classList.remove(styles.appear);
        //     }
        // }
    // }, []);

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
        <motion.div
            className={styles.underlay}
            key="signinUnderlay"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.1,
                ease: "linear",
            }}
        >
            {
                <motion.div
                    className={styles.content}
                    initial={{ y: -400 }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        type: "spring",
                        bounce: 0.6,
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
    );
};

export default TheSignInPopUp;
