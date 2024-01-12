import Image from "next/image";
import styles from "./home.module.scss";
import imgLogoSrc from "../public/images/vkusniaski-logo.png";
import TheNewsList from "./components/TheNewsList/TheNewsList";

export default function Home() {
    return (
        <div className={"page"}>
            <div className={styles.wrapper}>
                <section className={styles.intro}>
                    <div className={styles.logoWrapper}>
                        <Image className={styles.imgLogo} src={imgLogoSrc} width={600} height={393} alt="logo"></Image>
                    </div>
                    {/* <h2>ВКУСНЯШКИ ВІД НАТАШКИ</h2> */}
                    <p className={styles.description}>Магазин смачної домашньої кухні</p>
                </section>
                <section className={styles.newsList}>
                    <TheNewsList></TheNewsList>
                </section>
            </div>
        </div>
    );
}
