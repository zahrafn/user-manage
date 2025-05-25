import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";

const Info = () => {
    const { name: { first, last }, gender, login: { username } } = useUserContext();

    return <div className={styles["user__info"]}>
        <h3 className={styles["user__info-main"]}>{`${first} ${last}`}</h3>
        <p className={styles["user__info-detail"]}>{`${username} / ${gender}`}</p>
    </div>;
};

export default Info;