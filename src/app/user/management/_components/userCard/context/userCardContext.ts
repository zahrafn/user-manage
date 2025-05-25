import { createContext, useContext } from 'react';
import { IUserCardProps } from '../../types';

const UserCardContext = createContext<IUserCardProps | null>(null);

export const UserCardProvider = UserCardContext.Provider;

export const useUserContext = () => {
    const context = useContext(UserCardContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserCard component');
    }
    return context;
};