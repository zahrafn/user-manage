import { apiClient } from "@/services/api/apiClient";
import { getUserList } from "@/services/user/userServices";
import { useInfiniteQuery } from "@tanstack/react-query";

interface IUseUserListProps {
  nat: string;
  gender: string
}

export const useUserList = (filters: IUseUserListProps) => {
  return useInfiniteQuery({
    queryKey: ['userList', filters],
    queryFn: ({ pageParam = 1 }) =>
      getUserList({ page: pageParam, results: 20, ...filters }, apiClient),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.results.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
