import { RegistrationCredsType } from "@/common/types/types";
import ApiService from "./APIService";

export const registerUser = async (
  creds: RegistrationCredsType
): Promise<{ success: boolean }> => {
  const response = await ApiService.post("/api/user", creds);
  return response.data;
};
