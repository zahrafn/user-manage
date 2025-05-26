'use client';

import UserCard from "@/app/user/management/_components/userCard/namespace";
import { UserProfilePageProps } from "./types";
import styles from "./user-profile.module.scss";

export const UserProfilePage = ({ user }: UserProfilePageProps) => {
  
  return (
    <UserCard user={user}>
      <div className={styles["user-profile"]}>
        <div className={styles["user-profile__header"]}>
          <UserCard.Avatar />
          <div className={styles["user-profile__info"]}>
            <h2 className={styles["user-profile__name"]}>
              {`${user.name.first} ${user.name.last}`}
            </h2>
            <p className={styles["user-profile__email"]}>{user.email}</p>
          </div>
          <UserCard.FavoriteButton
          />
        </div>
      </div>
    </UserCard>
  );
};