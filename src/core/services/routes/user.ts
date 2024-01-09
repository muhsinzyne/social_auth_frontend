import ApiService from "../APIService";

export const getSingleUser = async (
  userId: string
): Promise<{ success: boolean }> => {
  ApiService.setHeader();
  const response = await ApiService.get("/api/user", userId);
  return response.data;
};
