'use client';

import { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { useWindowHeight } from './hooks/useWindowHeight';
import { useUserList } from './hooks/useUserList';
import { UserItem } from '../userCard';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { ExportButton } from './components/exportButtons';
import { useUserExcelExport } from './hooks/useUserExcelExport';

export const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');
  const windowHeight = useWindowHeight();
  const listRef = useRef<any>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useUserList({ nat: searchTerm, gender });

  const users = data?.pages.flatMap(p => p.results) || [];

    const { handleDownloadFromApi, handleDownloadCurrentPage } = useUserExcelExport();

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (visibleStopIndex >= users.length - 1 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [users.length, hasNextPage, isFetchingNextPage]
  );


  const router = useRouter();

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

  const debouncedSearch = useRef(
    debounce((value: string) => setSearchTerm(value), 500)
  ).current;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [searchTerm, gender]);

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

      <div className="flex gap-2 mb-4">
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
        height={windowHeight - 100}
        itemCount={users.length}
        itemSize={85}
        width={'100%'}
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>

      <div className="h-12 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading....</p>}
        {!hasNextPage && <p>No more users</p>}
      </div>
    </div>
  );
};
