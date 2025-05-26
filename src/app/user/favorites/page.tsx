'use client';

import { useFavoriteStore } from '../management/_components/userCard/components/favorite/store/favoriteStore';
import UserCard from '../management/_components/userCard/namespace';

const FavoritesPage = () => {
    const favorites = useFavoriteStore((state) => state.favorites);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite users yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((user) => (
                        <UserCard user={user} key={user.login.uuid}>
                            <div>
                                <UserCard.Avatar />
                                <UserCard.Info />
                                <UserCard.CountryFlag />
                                <UserCard.FavoriteButton />
                            </div>
                        </UserCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
