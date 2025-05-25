'use client';

import UserCard from "./namespace";
import { IUserItemProp } from "./types";
import styles from "./user-card.module.scss"
export const UserItem = ({ user }: IUserItemProp) => {
    return (
        <UserCard user={user}>
            <div className={styles["user__main-info"]}>
                <UserCard.Avatar />
                <UserCard.Info />
                <UserCard.ExtraInfo />
                <div>
                    <UserCard.CountryFlag />
                    <UserCard.FavoriteButton />
                </div>
            </div>
        </UserCard>
    );
}