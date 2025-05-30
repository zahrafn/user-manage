export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiInstanceParams<T = unknown> {
    url: string;
    method: Method;
    data?: T;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    baseURL?: string;
    signal?: AbortSignal;
}
