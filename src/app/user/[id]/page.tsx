import { getUserProfile } from "@/services/user/userServices";
import { UserProfilePage } from "./_components/userProfile";
import { apiServer } from "@/services/api/apiServer";

export const dynamic = 'force-dynamic';

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
    const { id }: { id: string } = await params;
    const response = await getUserProfile({ uuid: id }, apiServer);
    const userInfo = response?.results[0];

    return <UserProfilePage user={userInfo} />;
}