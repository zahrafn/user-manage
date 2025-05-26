

import { getUserList } from "@/services/user/userServices";
import { apiServer } from "@/services/api/apiServer";
import { UserList } from "./_components/userList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['userList', { page: 1, results: 20, nat: '', gender: '' }],
    queryFn: () => getUserList({ page: 1, results: 20 }, apiServer),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserList />
    </HydrationBoundary>
  );
}
