import { useUserContext } from "../context/userCardContext";
import styles from "../user-card.module.scss";
import Image from "next/image";

export default function Avatar() {
  const {
    name: { first, last },
    picture: { medium },
  } = useUserContext();

  return (
    <Image
      src={medium}
      alt={`${first} ${last}`}
      width={100}
      height={100}
      className={styles["user__avatar"]}
    />
  );
}
