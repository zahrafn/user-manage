'use client';

import { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useWindowHeight } from './hooks/useWindowHeight';
import { IUserCardProps } from '../types';
import { useUserList } from './hooks/useUserList';
import { UserItem } from '../userCard';

export const UserList = ({ initialUsers }: { initialUsers: IUserCardProps[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { users, loading, loadUsers, hasMore, resetAndLoadUsers } = useUserList({
    initialPage: 2,
    initialResults: 20,
    initialData: initialUsers,
    nat: searchTerm,
  });


  const windowHeight = useWindowHeight();
  const listRef = useRef<any>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (visibleStopIndex >= users.length - 1 && !loading && hasMore) {
        loadUsers();
      }
    },
    [users.length, loading, loadUsers, hasMore]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

useEffect(() => {
  const resetAndFetch = async () => {
    await resetAndLoadUsers();
    await loadUsers();
  };
  resetAndFetch();
}, [searchTerm]);

  // const filteredUsers = users.filter((user) =>
  //   user.nat.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  
  const filteredUsers = users;

  const Row = ({ index, style }: { index: number; style: any }) => {
    const user = filteredUsers[index];
    return (
      <div style={style}>
        <UserItem user={user} />
      </div>
    );
  };

  if (!hasMounted) return null;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by nationality (e.g. US, GB, FR)"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />

      <List
        ref={listRef}
        height={windowHeight - 100}
        itemCount={filteredUsers.length}
        itemSize={85}
        width={'100%'}
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>

      <div className="h-12 flex justify-center items-center">
        {loading && <p>Loading....</p>}
        {!hasMore && <p>No more users</p>}
      </div>
    </div>
  );
};
