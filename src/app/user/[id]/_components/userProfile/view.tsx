
'use client';

import UserCard from "@/app/user/management/_components/userCard/namespace";
import { UserProfilePageProps } from "./types";

export const UserProfilePage =({ user }: UserProfilePageProps) => {

  return (
    <UserCard user={user}>
      <div>
        <UserCard.Avatar />
        <div>
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>{user.email}</p>
        </div>
        <UserCard.FavoriteButton />
      </div>
    </UserCard>
  );
}