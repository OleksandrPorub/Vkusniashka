import Image from "next/image";
import styles from "./TheContactsCard.module.scss";
import selfifotoSrc from "@/public/images/natashka-selfi-foto.png";
import iconViber from "@/public/icons/viber-icon.png";

const TheContactsCard = () => {
    return (
        <article className={styles.contactsCard}>
            <section className={styles.intro}>
                <p className={styles.intro_text}>
                    <span className={styles.intro_name}>НАТАШКА</span>&nbsp;-&nbsp;це&nbsp;я:
                </p>
                <Image className={styles.intro_img} src="/images/natashka-selfi-foto.png" alt="selfi foto" width={100} height={100}></Image>
                {/* <h3 className={styles.headline}>Задати питання чи замовити страви ви можете скориставшись каналами для зв&apos;язку:</h3> */}
            </section>
            <h3 className={styles.headline}>Задати питання чи замовити страви ви можете скориставшись каналами для зв&apos;язку:</h3>

            <ul className={styles.contactsList}>
                <li>
                    <a
                        className={styles.contactsItem}
                        // href="viber://pa?chatURI=https://invite.viber.com/?g2=AQA%2FLvuny24NHk2Of4aZAoZS0Xql%2FF5uoYCs6nxq24Y8trSvg2N6Hyd4BcetVmlR"
                        href="https://invite.viber.com/?g2=AQA%2FLvuny24NHk2Of4aZAoZS0Xql%2FF5uoYCs6nxq24Y8trSvg2N6Hyd4BcetVmlR"
                        target="_blank"
                    >
                        <Image className={styles.contactsItem_icon} src={iconViber} alt="icon viber" width={40}></Image>
                        Viber спільнота &quot;Вкусняшки від Наташки&ldquo;
                    </a>
                </li>
                <li>
                    <a className={styles.contactsItem} href="viber://chat?number=%2B380978744534">
                        <Image className={styles.contactsItem_icon} src={iconViber} alt="icon viber" width={40}></Image>
                        Viber мій особистий
                    </a>
                </li>
                <li>
                    <a className={styles.contactsItem} href="tel:+380978744534">
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.contactsItem_icon} viewBox="0 0 512 512">
                            <title>Call</title>
                            <path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z" />
                        </svg>
                        тел: +38 097 874 45 34
                    </a>
                </li>
            </ul>
        </article>
    );
};

export default TheContactsCard;
