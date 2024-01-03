interface CommonErrorResponse {
  success: boolean;
  error?: string;
}

export interface RegistrationCredsType {
  email: string;
  password: string;
}

export interface userLoginResponseType extends CommonErrorResponse {
  data?: {
    id: number;
    email: string;
  };
}
