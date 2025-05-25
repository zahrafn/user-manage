

import { getUserList } from "@/services/user/userServices";
import { apiServer } from "@/services/api/apiServer";
import { UserList } from "./_components/userList";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const response = await getUserList({ page: 1, results: 20 }, apiServer);
  const initialUsers = response.results;

  return <UserList initialUsers={initialUsers} />;
}
