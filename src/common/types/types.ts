export interface CommonErrorResponse {
  success: boolean;
  error?: string;
}

export interface RegistrationCredsType {
  email: string;
  password: string;
}

export interface UserLoginResponseType extends CommonErrorResponse {
  data?: {
    accessToken: string;
    user: {
      id: number;
      email: string;
    };
  };
}

export interface TokenRefreshResponse extends CommonErrorResponse {
  data?: {
    accessToken: string;
  };
}

export interface IsAuthResponseType extends CommonErrorResponse {
  data?: {
    auth: boolean;
  };
}

export interface AccountCheckType {
  source: "google" | "manual";
  email: string;
}

export interface AccountTypeResponse extends CommonErrorResponse {
  data: {
    linkAccount: boolean;
    login: boolean;
  };
}

export interface ResetPasswordType {
  id: string;
  token: string;
  newPassword: string;
}

export interface ForgotPassworResponse extends CommonErrorResponse {
  data: {
    mailSent: boolean;
  };
}

export interface ResetPassworResponse extends CommonErrorResponse {
  data: {
    resetPassword: boolean;
  };
}

export interface SingleUserResponse extends CommonErrorResponse {
  data?: {
    user: {
      id: number;
      email: string;
      googleId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export interface UserPreferences {
  id: number;
  email: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppType {
  appName: string;
  organization: string;
  source: string;
  appId: string;
  userId: string;
  step: number;
  domain?: string;
}

export interface GetAllAppsResponse extends CommonErrorResponse {
  data: Array<AppType>;
}

export interface GetSingleAppResponse extends CommonErrorResponse {
  data: AppType;
}

export interface CreateAppResponse extends CommonErrorResponse {
  data: {
    appId: string;
  };
}
