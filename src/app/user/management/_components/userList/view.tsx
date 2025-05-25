'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useWindowHeight } from './hooks/useWindowHeight';
import { IUserCardProps } from '../types';
import { useUserList } from './hooks/useUserList';
import { UserItem } from '../userCard';

export const UserList =({ initialUsers }: { initialUsers: IUserCardProps[] }) =>{
  const { users, loading, loadUsers, hasMore } = useUserList({
    initialPage: 2,
    initialResults: 20,
    initialData: initialUsers,
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

  const Row = ({ index, style }: { index: number; style: any }) => {
    const user = users[index];
    return (
      <div style={style}>
        <UserItem user={user} />
      </div>
    );
  };

  if (!hasMounted) return null;

  return (
    <div>
      <List
        ref={listRef}
        height={windowHeight}
        itemCount={users.length}
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
}
