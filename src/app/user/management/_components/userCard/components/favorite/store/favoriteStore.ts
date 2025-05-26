import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserCardProps } from '../../../../types';

interface FavoriteState {
  favorites: IUserCardProps[];
  addFavorite: (user: IUserCardProps) => void;
  removeFavorite: (uuid: string) => void;
  isFavorite: (uuid: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (user) => {
        const exists = get().favorites.some((u) => u.login.uuid === user.login.uuid);
        if (!exists) {
          set({ favorites: [...get().favorites, user] });
        }
      },
      removeFavorite: (uuid) => {
        set({
          favorites: get().favorites.filter((u) => u.login.uuid !== uuid),
        });
      },
      isFavorite: (uuid) => {
        return get().favorites.some((u) => u.login.uuid === uuid);
      },
    }),
    {
      name: 'favorite-storage',
    }
  )
);
