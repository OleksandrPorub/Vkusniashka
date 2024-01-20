"use client";

import { useEffect, useState } from "react";
import styles from "./TheNewsList.module.scss";
import { createNews, deleteNews, editNews, getAllNews } from "@/app/services/mongoFetchNews";
import TheLoader from "../UI/loader/TheLoader";
import { useSession } from "next-auth/react";
import TheNewsEditForm from "../UI/newsEditForm/TheNewsEditForm";
import TheNewsCard from "../TheNewsCard/TheNewsCard";


// const newsDefault = [
//     {
//         id: "01",
//         date: new Date("2024-01-12").getTime(),
//         title: "Новина №1",
//         text: "",
//     },
//     {
//         id: "02",
//         date: new Date("2024-01-12").getTime(),
//         title: "Новина №2",
//         text: "Доброго дня",
//     },
//     {
//         id: "03",
//         date: new Date("2024-01-15").getTime(),
//         title: "Новина №3",
//         text: "Доброго дня",
//     },
//     {
//         id: "04",
//         date: new Date("2023-01-12").getTime(),
//         title: "Новина №4",
//         text: "Відсьогодні у нас в асортименті доступний для замовленния борщ червоний український з квасолею. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
//     },
//     {
//         id: "05",
//         date: new Date("2023-01-05").getTime(),
//         title: "Новина №5",
//         text: "З повним асортиментом ви можете ознайомитись у розділі МЕНЮ.  Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
//     },
//     {
//         id: "06",
//         date: new Date("2023-10-21").getTime(),
//         title: "Новина №6",
//         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
//     },
// ];

type newsType = {
    id: string;
    date: number;
    title?: string;
    text?: string;
};
type propsType = {
    newsListProp?: newsType[];
};

const TheNewsList = ({ newsListProp }: propsType) => {
    const [newsList, setNewsList]: [newsType[] | null, Function] = useState(newsListProp || null);
    const [isLoading, setIsLoading] = useState(false);
    const [creatingForm, setCreatingForm] = useState(false);
    const [activeNews, setActiveNews]: [newsType | null, Function] = useState(null);
    const [newsListSorted, setNewsListSorted]: [newsType[] | null, Function] = useState(newsListProp || null);
    const dateNowObj = new Date();
    const { data: session } = useSession();

    useEffect(() => {
        const getnews = async () => {
            setIsLoading(true);
            setNewsList(await getAllNews({}));
            setIsLoading(false);
        };
        if (newsListProp) {
            setNewsList(newsListProp);
        } else getnews();
    }, [newsListProp]);

    useEffect(() => {
        const fnCompare = (a: newsType, b: newsType) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        };
        newsList && setNewsListSorted(newsList.sort(fnCompare));
    }, [newsList]);
   
    const formCloserEditing = () => {
        setActiveNews(null);
    };
    const formCloserCreating = () => {
        setCreatingForm(false);
    };
    const handler_updateItem = async (news: newsType) => {
        await editNews(news);
        setNewsList(await getAllNews({}));
        setActiveNews(null);
    };
    const handler_createItem = async (news: newsType) => {
        await createNews(news);
        setNewsList(await getAllNews({}));
        setCreatingForm(false);
    };
    const itemDeletion = async(id:string)=>{
        await deleteNews({id});
        setNewsList(await getAllNews({}));
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.headLine}>Новини</h3>
            {session && <button className={styles.btn_createNews} onClick={()=>{setCreatingForm(true)}}>СТВОРИТИ НОВИНУ</button>}
            <ul className={styles.newsList}>
                {newsListSorted ? (
                    newsListSorted.map((news) => (
                        <li key={news.id}>
                            <TheNewsCard news={news} setActiveNews={setActiveNews} dateNow={dateNowObj} itemDeletion={itemDeletion} session={session}></TheNewsCard>                          
                        </li>
                    ))
                ) : isLoading ? (
                    <TheLoader size={80}></TheLoader>
                ) : (
                    <span className={styles.newsList_noNews}>Новин нема!</span>
                )}
            </ul>
            {activeNews && (
                <TheNewsEditForm formCloser={formCloserEditing} news={activeNews} handler_updateItem={handler_updateItem}></TheNewsEditForm>
            )}
            {creatingForm && (
                <TheNewsEditForm formCloser={formCloserCreating} handler_updateItem={handler_createItem}></TheNewsEditForm>
            )}
        </div>
    );
};

export default TheNewsList;
