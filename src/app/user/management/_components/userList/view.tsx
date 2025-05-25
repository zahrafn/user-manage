'use client';

import { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useWindowHeight } from './hooks/useWindowHeight';
import { IUserCardProps } from '../types';
import { useUserList } from './hooks/useUserList';
import { UserItem } from '../userCard';
import debounce from 'lodash.debounce';

export const UserList = ({ initialUsers }: { initialUsers: IUserCardProps[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
const [gender, setGender] = useState('');
  const { users, loading, loadUsers, hasMore, resetAndLoadUsers } = useUserList({
    initialPage: 2,
    initialResults: 20,
    initialData: initialUsers,
    nat: searchTerm,
     gender,
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

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 700)
  ).current;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

   const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };


  useEffect(() => {
    const resetAndFetch = async () => {
      await resetAndLoadUsers();
      await loadUsers();
    };
    resetAndFetch();
  }, [searchTerm, gender]);

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
          <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by nationality (e.g. US, GB, FR)"
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />

        <select
          value={gender}
          onChange={handleGenderChange}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

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
