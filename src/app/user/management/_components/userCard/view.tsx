'use client';

import UserCard from "./namespace";
import { IUserItemProp } from "./types";
import styles from "./user-card.module.scss"
export const UserItem = ({ user }: IUserItemProp) => {
    return (
        <UserCard user={user}>
            <div className={styles["user__container"]}>
                <div className={styles["user__profile"]}>
                    <UserCard.Avatar />
                    <UserCard.Info />
                </div>
                <div className={styles["user__contact"]}>
                    <UserCard.ExtraInfo />
                </div>
                <div className={styles["user__actions"]}>
                    <UserCard.CountryFlag />
                     <div onClick={e => e.stopPropagation()}>
                        <UserCard.FavoriteButton />
                    </div>
                </div>
            </div>
        </UserCard>
    );
}