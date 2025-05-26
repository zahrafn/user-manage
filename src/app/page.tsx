
import styles from "@/styles/main.module.scss"
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles["home"]}>
      <h1 className={styles["home__title"]}>Welcome to User Management</h1>
      <div className={styles["home__actions"]}>
        <Link href="/user/management" className={`${styles["home__button"]} ${styles["home__button--primary"]}`}>
          View Users
        </Link>
        <Link href="/user/favorites" className={`${styles["home__button"]} ${styles["home__button--success"]}`} >
          View Favorites
        </Link>
      </div>
    </main>
  );
}
