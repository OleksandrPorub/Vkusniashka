"use client";

import styles from "./TheNewsCard.module.scss";
import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";

type newsType = {
    id: string;
    date: number;
    title?: string;
    text?: string;
};
type PropsType = {
    news: newsType;
    setActiveNews: Function;
    dateNow: Date;
    itemDeletion: Function;
    session: Session|null;
};

const daysOfTheWeek = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];

const TheNewsCard = ({ news, setActiveNews, dateNow, itemDeletion, session }: PropsType) => {
    
    const [newsCardTextElement, setNewsCardTextElement]: [Element | null, Function] = useState(null);

    const whichDay = (date: number) => {
        if (new Date(date).toLocaleDateString() === dateNow.toLocaleDateString()) return "СЬОГОДНІ";
        if (new Date(date + 24 * 3600 * 1000).toLocaleDateString() === dateNow.toLocaleDateString()) return "ВЧОРА";
        return null;
    };
    const newsCardTextRef = useRef(null);

    useEffect(() => {
        const elementText = newsCardTextRef.current;
        console.log(elementText);
        setNewsCardTextElement(elementText);
        if (elementText) {
            setNewsCardTextElement(elementText);
        }
    }, []);

    useEffect(() => {
        console.dir(newsCardTextElement);
        if (newsCardTextElement) {
            newsCardTextElement.innerText = news.text;
        }
    }, [news, newsCardTextElement]);

    return (
        <article className={styles.newsCard}>
            {session && (
                <div className={styles.adminSection}>
                    <button
                        className={styles.adminBtn}
                        onClick={() => {
                            setActiveNews(news);
                        }}
                    >
                        edit
                    </button>
                    <button
                        className={styles.adminBtn}
                        onClick={() => {
                            itemDeletion(news.id);
                        }}
                    >
                        del
                    </button>
                </div>
            )}
            <span className={styles.newsCard_date}>
                <strong className={styles.newsCard_date_strong}>{whichDay(news.date)}</strong>&nbsp;&nbsp;
                {new Date(news.date).toLocaleDateString()}&nbsp;&nbsp;{daysOfTheWeek[new Date(news.date).getDay()]}
            </span>
            <h4 className={styles.newsCard_title}>{news.title}</h4>
            <p ref={newsCardTextRef} className={styles.newsCard_text}>
            </p>
        </article>
    );
};

export default TheNewsCard;
