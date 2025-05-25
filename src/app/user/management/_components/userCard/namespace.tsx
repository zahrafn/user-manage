
import styles from './user-card.module.scss';
import CountryFlag from './components/countryFlag';
import FavoriteButton from './components/favoriteButton';
import Info from './components/userInfo';
import { UserCardProvider } from './context/userCardContext';
import Avatar from './components/avatar';
import { IUserCardProps } from '../types';
import UserExtraInfo from './components/userExtraInfo';

interface UserCardProps {
  user: IUserCardProps;
  children: React.ReactNode;
}

const UserCardNamespace = ({ user, children }: UserCardProps) => {
  return (
    <UserCardProvider value={user}>
      <div className={styles["user__wrap"]}>{children}</div>
    </UserCardProvider>
  );
};

UserCardNamespace.Avatar = Avatar;
UserCardNamespace.Info = Info;
UserCardNamespace.ExtraInfo = UserExtraInfo;
UserCardNamespace.CountryFlag = CountryFlag;
UserCardNamespace.FavoriteButton = FavoriteButton;

export default UserCardNamespace ;