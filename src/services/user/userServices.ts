


import { ApiInstanceParams } from "../api/types";
import { IGetUserListRequest, IGetUserListResponse } from "./types";
import { UserUrls } from "./urls";

export async function getUserList(request: IGetUserListRequest,
    apiInstance: <T>({ url, method, data, params, headers, baseURL, }:
        ApiInstanceParams<T>) => Promise<T>) {
    return apiInstance<IGetUserListResponse>({
        url: UserUrls.getUser,
        method: "GET",
        params: {
            page: request.page,
            results: request.results,
            nat:request.nat,
            gender:request.gender
        },
    });
}