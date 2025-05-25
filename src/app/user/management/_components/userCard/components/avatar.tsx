import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";

const Avatar = () => {

    const { name: { first, last }, picture: { medium } } = useUserContext();

    return <img src={medium} alt={`${first} ${last}`} className={styles["user__avatar"]} />;
};

export default Avatar;