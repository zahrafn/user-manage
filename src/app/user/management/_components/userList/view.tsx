'use client';

import { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useWindowSize } from './hooks/useWindowSize';
import { useUserList } from './hooks/useUserList';
import { UserItem } from '../userCard';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { ExportButton } from './components/exportButtons';
import { useUserExcelExport } from './hooks/useUserExcelExport';
import styles from "./user-list.module.scss";
import { SkeletonUserCard } from './components/skeleton';
import { useUserSearch } from './hooks/useUserSearch';

export const UserList = () => {

  // search
    const { 
    searchTerm, 
    debouncedSearchTerm, 
    handleSearchChange 
  } = useUserSearch('');
  
  const [gender, setGender] = useState('');
  const { width, height } = useWindowSize();
  const listRef = useRef<any>(null);
  const mobileBreakPoint = 768;
  const itemSize = width < mobileBreakPoint ? 180 : 85;
  const router = useRouter();

  // infinit scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useUserList({ nat: debouncedSearchTerm, gender });

  const users = data?.pages.flatMap(p => p.results) || [];

  // export excel
  const { handleDownloadFromApi, handleDownloadCurrentPage } = useUserExcelExport();

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (visibleStopIndex >= users.length - 1 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [users.length, hasNextPage, isFetchingNextPage]
  );

  const Row = ({ index, style }: { index: number; style: any }) => {
    const user = users[index];
    const handleClick = () => {
      router.push(`/user/${user.login.uuid}`);
    };

    return (
      <div style={style} onClick={handleClick}>
        <UserItem user={user} />
      </div>
    );
  };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, gender]);

  return (
    <div className={styles["user-list"]}>
      <div className={styles["user-list__actions"]}>
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

      <div className={styles["user-list__actions"]}>
        <ExportButton
          onExport={handleDownloadFromApi}
          label="Export All from API"
          variant="primary"
        />
        <ExportButton
          onExport={() => handleDownloadCurrentPage(users)}
          label="Export Current Page"
          variant="success"
        />
      </div>

      <List
        ref={listRef}
        height={height - 140}
        itemCount={users.length}
        itemSize={itemSize}
        width={'100%'}
        onItemsRendered={handleItemsRendered}
        style={{ padding: "10px" }}
      >
        {Row}
      </List>


      {isFetchingNextPage && (
        <div className={styles["user-list__load-wrap"]}>
          {[...Array(7)].map((_, i) => (
            <SkeletonUserCard key={i} />
          ))}
        </div>
      )}

      {!hasNextPage &&
        <div className={styles["user-list__status-message"]}> <p>No more users</p> </div>}
    </div>

  );
};
