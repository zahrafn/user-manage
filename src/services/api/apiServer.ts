import { AxiosAdapter } from "./adaptors/axiosAdapter";
import { cookies } from "next/headers";
import { ApiInstanceParams } from "./types";

export const apiServer = async <T>({
    url,
    method,
    data,
    params,
    headers = {},
    baseURL = process.env.NEXT_PUBLIC_API_URL,
}: ApiInstanceParams<T>): Promise<T> => {
    const httpClient = new AxiosAdapter(baseURL, true);
    
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    httpClient.setHeaders({
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    const fullUrl = `${url}${queryString}`;

    switch (method) {
        case "GET":
            return httpClient.get<T>(fullUrl);
        case "POST":
            return httpClient.post<T>(fullUrl, data);
        case "PUT":
            return httpClient.put<T>(fullUrl, data);
        case "PATCH":
            return httpClient.put<T>(fullUrl, data);
        case "DELETE":
            return httpClient.delete<T>(fullUrl);
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }
};
