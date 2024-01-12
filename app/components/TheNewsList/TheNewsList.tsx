import styles from "./TheNewsList.module.scss";

const newsDefault = [
    {
        id: "01",
        date: new Date(),
        title: "Сьогодні у нас новий продукт.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "02",
        date: new Date(),
        title: "Магазин відкриється 0 17:30.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "03",
        date: new Date(),
        title: "Сьогодні трохи запізнююсь",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
    {
        id: "04",
        date: new Date(),
        title: "Доступний для замовленния борщ з квасолею.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis sit soluta quia magni est incidunt voluptatibus officiis voluptas reiciendis.",
    },
];

type newsType = {
    id: string;
    date: Date;
    title: string;
    text: string;
};
type propsType = {
    newsList?: newsType[],
};

const TheNewsList = ({ newsList = newsDefault }: propsType) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.headLine}>Новини</h3>
            <ul className={styles.newsList}>
                {newsList.map((news) => (
                    <li key={news.id}>
                        <article className={styles.newsCard}>
                            <span className={styles.newsCard_date}>{news.date.getDate()}.{news.date.getMonth()+1}.{news.date.getFullYear()}</span>
                            <h4 className={styles.newsCard_title}>{news.title}</h4>
                            <p className={styles.newsCard_text}>{news.text}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TheNewsList;
