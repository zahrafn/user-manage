import styles from "../../user-card.module.scss";
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder';
import { MdFavorite } from '@react-icons/all-files/md/MdFavorite';
import { useFavoriteStore } from "./store/favoriteStore";
import { useUserContext } from "../../context/userCardContext";

const FavoriteButton = () => {
  const user = useUserContext();
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();

  const isFav = isFavorite(user.login.uuid);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(user.login.uuid);
    } else {
      addFavorite(user);
    }
  };

  return (
    <button onClick={toggleFavorite} className={styles["favorite-button"]}>
      {isFav ? <MdFavorite size={24} color="red" /> : <MdFavoriteBorder size={24} color="red" />}
    </button>
  );
};

export default FavoriteButton;