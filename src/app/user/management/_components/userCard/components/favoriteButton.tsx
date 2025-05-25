import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder';

const FavoriteButton = () => {

    return <button onClick={() => { }} className={styles.favoriteButton}>
        <MdFavoriteBorder size={24} color="red" />
    </button>;
};

export default FavoriteButton;