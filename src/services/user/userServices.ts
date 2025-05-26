


import { ApiInstanceParams } from "../api/types";
import { IGetUserListRequest, IGetUserListResponse, IGetUserProfileRequest, IGetUserProfileResponse } from "./types";
import { UserUrls } from "./urls";

type ApiInstanceType = <T>(options: ApiInstanceParams<T>) => Promise<T>;

// GET User List
export async function getUserList(
  { page, results, nat, gender }: IGetUserListRequest,
  apiInstance: ApiInstanceType
) {
  return apiInstance<IGetUserListResponse>({
    url: UserUrls.main,
    method: "GET",
    params: {
      page,
      results,
      nat,
      gender,
    },
  });
}

// GET User Profile
export async function getUserProfile(
  { uuid }: IGetUserProfileRequest,
  apiInstance: ApiInstanceType
) {
  return apiInstance<IGetUserProfileResponse>({
    url: UserUrls.main,
    method: "GET",
    params: { uuid },
  });
}