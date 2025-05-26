
import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";
import Image from "next/image";

const CountryFlag = () => {
    const { nat } = useUserContext();

    return (
        <Image
        src={`https://flagcdn.com/w40/${nat.toLowerCase()}.png`}
        alt={nat}
        width={40}
        height={40}
        className={styles["flag"]}
    />
    );
};

export default CountryFlag;