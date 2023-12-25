import Image from "next/image";
import styles from "./home.module.scss";

export default function Home() {
    return (
        <div className={"page"}>
            <div className={styles.wrapper}>
                <article className={styles.intro}>
                    <h2>ВКУСНЯШКИ ВІД НАТАШКИ</h2>
                    <p className={styles.description}>Магазин смачної домашньої кухні</p>
                </article>
            </div>
        </div>
    );
}
