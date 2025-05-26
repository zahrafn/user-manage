import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import {  FaPhone } from '@react-icons/all-files/fa/FaPhone';

const UserExtraInfo = () => {
    const { location: { street, city, state, country }, phone, email } = useUserContext();

    return <div className={styles["user__extra-info"]}>
        <span className={styles["user__extra-info--small"]}><FaPhone />{phone}</span>
        <span className={styles["user__email"]}><FaEnvelope color="gray" />{email}</span>
        <address className={styles["user__extra-info--small"]}>
            {`${street.number} ${street.name}, ${city}, ${state}, ${country}`}
        </address>
    </div>;
};

export default UserExtraInfo;