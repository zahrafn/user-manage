'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

export const useUserSearch = (initialValue = '', debounceTime = 500) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    const debounced = debounce(
      (value: string) => setDebouncedSearchTerm(value),
      debounceTime
    );
    debounced(searchTerm);
    return () => debounced.cancel();
  }, [searchTerm, debounceTime]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
    resetSearch,
  };
};