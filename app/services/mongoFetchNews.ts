// import { NewsType } from "../api/newsModel";
type NewsType = {
    id: string;
    date: number;
    title?: string;
    text?: string;
};

const BASE_URL: string = process.env.NEXT_PUBLIC_DOMEN_BASE_URL! || "https://vkusniashka.vercel.app";

if (!BASE_URL) {
    throw new Error("Please define the BASE_URL environment variable inside .env.local");
}

const URL_NEWS = BASE_URL + "/api/db.news";

export const getAllNews = async ({ query }: { query?: string }) => {

    const url = query ? URL_NEWS + `?q=${query}` : URL_NEWS;
    const response = await fetch(url);
    return response.json();
};

export const deleteNews = async ({ id }: { id: string }) => {
    const url = id ? URL_NEWS + `?id=${id}` : URL_NEWS;
    const response = await fetch(url, {
        method: "DELETE",
    });
    return response.json();
};

export const editNews = async (news: NewsType) => {
    const id = news.id;
    const url = id ? URL_NEWS + `?id=${id}` : URL_NEWS;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(news),
    });
    return response.json();
};

export const createNews = async (news: NewsType) => {
   
    const url =  URL_NEWS;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(news),
    });
    return response.json();
};