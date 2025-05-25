import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";

const UserExtraInfo = () => {
    const { location: { street, city, state, country }, phone, email } = useUserContext();

    return <div className={styles["user__extra-info"]}>
        <span className={styles["user__extra-info--small"]}>{phone}</span>
        <span className={styles["user__email"]}>{email}</span>
        <address className={styles["user__extra-info--small"]}>
            {`${street.number} ${street.name}, ${city}, ${state}, ${country}`}
        </address>
    </div>;
};

export default UserExtraInfo;