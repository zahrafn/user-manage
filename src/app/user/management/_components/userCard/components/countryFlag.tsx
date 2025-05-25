
import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";

const CountryFlag = () => {
    const { nat } = useUserContext();
    return <img
        src={`https://flagcdn.com/w40/${nat.toLowerCase()}.png`}
        alt={nat}
        className={styles.flag}
    />;
};

export default CountryFlag;