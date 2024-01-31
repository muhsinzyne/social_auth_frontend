import {
  AccountCheckType,
  IsAuthResponseType,
  RegistrationCredsType,
  TokenRefreshResponse,
  UserLoginResponseType,
  AccountTypeResponse,
  ResetPasswordType,
  ResetPassworResponse,
  ForgotPassworResponse,
  CommonErrorResponse,
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

export const isAuthenticated = async (): Promise<IsAuthResponseType> => {
  const response = await ApiService.get("/api/auth/authentication", "", {
    withCredentials: true,
  });
  return response.data;
};

export const accountCheck = async (
  creds: AccountCheckType
): Promise<AccountTypeResponse> => {
  const response = await ApiService.post("/api/auth/account/check", creds);
  return response.data;
};

export const forgotPassword = async (creds: {
  email: string;
}): Promise<ForgotPassworResponse> => {
  const response = await ApiService.post("/api/auth/password/forgot", creds);
  return response.data;
};

export const resetPassword = async (
  creds: ResetPasswordType
): Promise<ResetPassworResponse> => {
  const response = await ApiService.post("/api/auth/password/reset", creds);
  return response.data;
};

export const userLogout = async (): Promise<CommonErrorResponse> => {
  const response = await ApiService.post(
    "/api/auth/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
