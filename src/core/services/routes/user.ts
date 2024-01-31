import { SingleUserResponse } from "@/common/types/types";
import ApiService from "../APIService";

export const getSingleUser = async (
  userId: string
): Promise<SingleUserResponse> => {
  ApiService.setHeader();
  const response = await ApiService.get("/api/user", userId);
  return response.data;
};
