import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";

export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  setHeaders(headers: Record<string, string>): void;
  setToken(token: string | undefined): void;
}

export class AxiosAdapter implements HttpClient {
  private instance: AxiosInstance;
  private customHeaders: Record<string, string> = {};
  private token: string | undefined;
  private enableLogs: boolean;

  constructor(baseURL?: string, enableLogs: boolean = false) {
    this.enableLogs = enableLogs;

    this.instance = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  setToken(token: string | undefined) {
    this.token = token;
  }

  setHeaders(headers: Record<string, string>): void {
    this.customHeaders = headers;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const headers = AxiosHeaders.from(config.headers || {});

        if (this.token) {
          headers.set("Authorization", `Bearer ${this.token}`);
        }

        Object.entries(this.customHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });

        config.headers = headers;

        if (this.enableLogs) {
          console.log("Request:", config);
        }

        return config;
      },
      (error: AxiosError) => {
        if (this.enableLogs) {
          console.error("Request error:", error);
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: any) => {
        if (axios.isCancel(error)) {
          console.warn("Request cancelled:", error.message);
        } else {
          const status = error.response?.status;
          if (status === 401) {
            console.warn("Unauthorized");
          } else if (status === 500) {
            console.error("Server Error");
          } else {
            console.error("Response error:", error);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config).then((res) => res.data);
  }

  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config).then((res) => res.data);
  }

  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, config).then((res) => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config).then((res) => res.data);
  }
}
