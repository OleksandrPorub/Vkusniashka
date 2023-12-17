import Link from "next/link"
import styles from "./TheNavigation.module.scss"


const TheNavigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link className={styles.nav_item} href='/'>Домашня</Link></li>
        <li><Link className={styles.nav_item} href='/menuToday'>Меню сьогодні</Link></li>
        <li><Link className={styles.nav_item} href='/assortment'>Ассортимент</Link></li>
      </ul>
    </nav>
  )
}

export default TheNavigation
