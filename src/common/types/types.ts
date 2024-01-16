interface CommonErrorResponse {
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
