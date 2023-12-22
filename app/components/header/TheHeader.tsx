import TheNavigation from '../navigation/TheNavigation'
import styles from './header.module.css'

function Header() {
  return (
    <div className={styles.header} >
      <TheNavigation></TheNavigation>
    </div>
  )
}

export default Header
