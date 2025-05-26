import { getUserProfile } from "@/services/user/userServices";
import { UserProfilePage } from "./_components/userProfile";
import { apiServer } from "@/services/api/apiServer";

export default async function getUser(id: string) {
    const response = await getUserProfile({ uuid: id, }, apiServer);
    const userInfo = response?.results[0];
    return <UserProfilePage user={userInfo} />;
}


