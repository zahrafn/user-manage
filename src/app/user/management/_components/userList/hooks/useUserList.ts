import { apiClient } from "@/services/api/apiClient";
import { IUser } from "@/services/user/types";
import { getUserList } from "@/services/user/userServices";
import { useState, useCallback } from "react";

interface UseUserListProps {
  initialPage?: number;
  initialResults?: number;
  initialData?: IUser[];
}

export function useUserList({
  initialPage = 1,
  initialResults = 20,
  initialData = [],
}: UseUserListProps) {
  const [users, setUsers] = useState<IUser[]>(initialData);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const loadUsers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getUserList({ page, results: initialResults },apiClient);
      if (response.results.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => [...prev, ...response.results]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  }, [page, initialResults, loading, hasMore]);


  return {
    users,
    loading,
    loadUsers,
    hasMore,
  };
}
