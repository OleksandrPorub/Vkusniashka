"use client";

import SvgIcon_Del from "../svg/SvgIcon_Del";
import SvgIcon_Edit from "../svg/SvgIcon_Edit";
import styles from "./TheNewsCard.module.scss";
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
    session: Session | null;
};

const daysOfTheWeek = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];

const TheNewsCard = ({ news, setActiveNews, dateNow, itemDeletion, session }: PropsType) => {
  
    const whichDay = (date: number) => {
        if (new Date(date).toLocaleDateString() === dateNow.toLocaleDateString()) return "СЬОГОДНІ";
        if (new Date(date + 24 * 3600 * 1000).toLocaleDateString() === dateNow.toLocaleDateString()) return "ВЧОРА";
        return null;
    };

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
                            <SvgIcon_Edit/>
                        </button>
                        <button
                            className={styles.adminBtn}
                            onClick={() => {
                                window.confirm("Видалити новину назавжди?") && itemDeletion(news.id);
                            }}
                        >
                            <SvgIcon_Del/>
                        </button>
                    </div>
                )}
                <span className={styles.newsCard_date}>
                    <strong className={styles.newsCard_date_strong}>{whichDay(news.date)}</strong>&nbsp;&nbsp;
                    {new Date(news.date).toLocaleDateString()}&nbsp;&nbsp;{daysOfTheWeek[new Date(news.date).getDay()]}
                </span>
                <h4 className={styles.newsCard_title}>{news.title}</h4>
                <pre className={styles.newsCard_text}>{news.text || ""}</pre>
            </article>
        // </div>
    );
};

export default TheNewsCard;
