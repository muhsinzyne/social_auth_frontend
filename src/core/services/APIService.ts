import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import { getToken, destroyToken, saveToken, deleteCookie } from "./JwtService";
import { tokenRefresh } from "./routes/auth";
import { handleNavigate } from "../helpers/path";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASE_URL;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";

    // Set up response interceptor
    ApiService.vueInstance.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },

      async (error) => {
        // Handle token expiration and recall
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.status === 401
        ) {
          // Token expired, remove the current token
          destroyToken();
          deleteCookie();

          if (error.response.data.error === "Access Token Expired") {
            try {
              const response = await tokenRefresh(); // Replace with your actual function to fetch a new token

              const newToken = response.data?.accessToken || "";

              saveToken(newToken);

              // Recall the original request with the new token
              const originalRequest = error.config;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // Return the Axios call to make the recall
              return ApiService.vueInstance.axios(originalRequest);
            } catch (refreshError) {
              // Handle token fetch error
              // Return a rejected promise with the error from token refresh
              return Promise.reject(refreshError);
            }
          } else if (
            error.response.data.error === "Refresh Token Expired" ||
            error.response.data.error === "Invalid Access Token"
          ) {
            handleNavigate("sign-in");
          }
          handleNavigate("sign-in");
        }

        // Return the original error in case it's not a 401
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string,
    config?: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`, config);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    params: any,
    config?: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params, config);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string, slug: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}/${slug}`);
  }
}

export default ApiService;
