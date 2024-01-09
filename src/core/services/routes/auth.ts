import {
  RegistrationCredsType,
  TokenRefreshResponse,
  UserLoginResponseType,
} from "@/common/types/types";
import ApiService from "../APIService";

export const registerUser = async (
  creds: RegistrationCredsType
): Promise<{ success: boolean }> => {
  const response = await ApiService.post("/api/auth/user/registration", creds);
  return response.data;
};

export const userLogin = async (
  creds: RegistrationCredsType
): Promise<UserLoginResponseType> => {
  const response = await ApiService.post("/api/auth/user/login", creds, {
    withCredentials: true,
  });
  return response.data;
};

export const tokenRefresh = async (): Promise<TokenRefreshResponse> => {
  const response = await ApiService.get("/api/auth/token/refresh", "", {
    withCredentials: true,
  });
  return response.data;
};
