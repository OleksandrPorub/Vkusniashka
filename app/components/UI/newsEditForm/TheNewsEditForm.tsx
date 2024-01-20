"use client";

import { FormEventHandler, useEffect, useState } from "react";
import styles from "./TheNewsEditForm.module.scss";
import ThePopUpWrapper from "../popUpWrapper/ThePopUpWrapper";
import { AnimatePresence, motion } from "framer-motion";
import TheCloserIcon from "../closerIcon/TheCloserIcon";

interface NewsType {
    id: string;
    date: number;
    title?: string;
    text?: string;
}

type PropsType = {
    formCloser: Function;
    news?: NewsType;
    handler_updateItem: Function;
};

const TheNewsEditForm: React.FC<PropsType> = ({ formCloser, news, handler_updateItem }) => {
    const [date, setDate] = useState(news?.date || new Date().getTime());
    const [title, setTitle] = useState(news?.title || "");
    const [text, setText] = useState(news?.text || "");
    const [formApear, setFormApear] = useState(false);

    useEffect(() => {
        setFormApear(true);
    }, []);
    const randomID = () => Math.random().toString(36).substring(2) + "-" + Date.now();

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData: NewsType = {
            title: title,
            id: news?.id || randomID(),
            date: date,
            text: text,
        };

        await handler_updateItem(formData);
        setFormApear(false);
        setTimeout(() => {
            formCloser();
        }, 400);
    };

    return (
        <ThePopUpWrapper>
            <AnimatePresence>
                {formApear && (
                    <motion.div
                        className={styles.formWrapper}
                        key="productCreateForm"
                        initial={{ y: "-50vh" }}
                        animate={{
                            y: 0,
                        }}
                        exit={{ y: "-50vh", opacity: 0 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            bounce: 0.5,
                        }}
                    >
                        <div
                            className={styles.closerWrapper}
                            onClick={(e) => {
                                setFormApear(false);
                                setTimeout(() => {
                                    formCloser();
                                }, 400);
                            }}
                        >
                            <TheCloserIcon width={40} color={"#98ff99"}></TheCloserIcon>
                        </div>
                        <form onSubmit={handleSave} className={styles.form}>
                            <span className={styles.newsDate}>{new Date(date).toLocaleDateString()}</span>
                            {news && (
                                <button
                                    className={styles.btn_changeDate}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDate(new Date().getTime());
                                    }}
                                >
                                    СЬОГОДНІ
                                </button>
                            )}
                            <label>
                                Заголовок:
                                <input className={styles.form_field} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            <label>
                                Текст:
                                <textarea className={styles.form_field} value={text} onChange={(e) => setText(e.target.value)} />
                            </label>
                            <button className={styles.btn_submit}>Зберегти</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </ThePopUpWrapper>
    );
};

export default TheNewsEditForm;
