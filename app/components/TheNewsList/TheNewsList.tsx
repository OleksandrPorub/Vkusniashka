"use client";

import { useEffect, useState } from "react";
// import { useEffect, useRef } from "react";
import styles from "./TheNewsList.module.scss";
// import { register } from "swiper/element/bundle";

// register();

const newsDefault = [
    {
        id: "01",
        date: new Date("2023-10-05").getTime(),
        title: "Сьогодні у нас новий продукт.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "02",
        date: new Date("2023-02-18").getTime(),
        title: "Магазин відкриється 0 17:30.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "03",
        date: new Date("2024-01-14").getTime(),
        title: "Сьогодні трохи запізнююсь",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "04",
        date: new Date("2024-01-12").getTime(),
        title: "Доступний для замовленния борщ з квасолею.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "05",
        date: new Date("2024-01-13").getTime(),
        title: "Сьогоні у магазині буде велики асортимент.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "06",
        date: new Date("2023-12-31").getTime(),
        title: "Всіх вітаю зі святом! Магазин не буде працювати 4 дні.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
];

type newsType = {
    id: string;
    date: number;
    title: string;
    text: string;
};
type propsType = {
    newsList?: newsType[];
};

// const swiperParams = {
//     slidesPerView: 1,
//     speed: 100,
//     spaceBetween: 15,
// };

const TheNewsList = ({ newsList = newsDefault }: propsType) => {
    // const swiperElRef = useRef(null);
    const [newsListSorted, setNewsListSorted] = useState([...newsList]);
    const dateNowObj = new Date;

    // useEffect(() => {
    //     Object.assign(swiperElRef.current, swiperParams);
    //     swiperElRef.current.initialize();
    //     swiperElRef.current.addEventListener("swiperprogress", (e) => {
    //         const [swiper, progress] = e.detail;
    //         console.log(progress);
    //     });
    //     swiperElRef.current.addEventListener("swiperslidechange", (e) => {
    //         console.log("slide changed");
    //     });
    // }, []);
    console.log(dateNowObj.getTime());
    console.log(dateNowObj);

    useEffect(() => {
        const fnCompare = (a: newsType, b: newsType) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0
        };
        // const sorted = newsList.sort(fnCompare);
        setNewsListSorted(newsList.sort(fnCompare));
    }, [newsList]);
const whichDay = (date:number)=>{
    if (new Date(date).toLocaleDateString()===dateNowObj.toLocaleDateString()) return "СЬОГОДНІ";
    if (new Date(date+(24*3600*1000)).toLocaleDateString()===dateNowObj.toLocaleDateString()) return "ВЧОРА";
    return null;
}
const daysOfTheWeek =[
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п'ятниця",
    "субота"
]
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.headLine}>Новини</h3>
            <ul className={styles.newsList}>
                {newsListSorted.map((news) => (
                    <li key={news.id}>
                        <article className={styles.newsCard}>
                            <span className={styles.newsCard_date}><strong className={styles.newsCard_date_strong}>{whichDay(news.date)}</strong>&nbsp;&nbsp;{new Date(news.date).toLocaleDateString()}&nbsp;&nbsp;{daysOfTheWeek[(new Date(news.date).getDay())]}</span>
                            <h4 className={styles.newsCard_title}>{news.title}</h4>
                            <p className={styles.newsCard_text}>{news.text}</p>
                        </article>
                    </li>
                ))}
            </ul>
            {/* <div className={styles.outerBox}>
                <swiper-container ref={swiperElRef} slides-per-view="1"
                    speed="100"
                    spaceBetween="15"
                    navigation="true"
                    pagination="true">
                    {newsList.map((news) => (
                        <swiper-slide key={news.id}>
                            <article className={styles.newsCard}>
                                <span className={styles.newsCard_date}>
                                    {news.date.getDate()}.{news.date.getMonth() + 1}.{news.date.getFullYear()}
                                </span>
                                <h4 className={styles.newsCard_title}>{news.title}</h4>
                                <p className={styles.newsCard_text}>{news.text}</p>
                            </article>
                        </swiper-slide>
                    ))}                   
                </swiper-container>
            </div> */}
        </div>
    );
};

export default TheNewsList;
