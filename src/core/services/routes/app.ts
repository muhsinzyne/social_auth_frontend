import {
  AppType,
  CommonErrorResponse,
  GetAllAppsResponse,
} from "@/common/types/types";
import ApiService from "../APIService";

export const addApp = async (
  payload: AppType
): Promise<CommonErrorResponse> => {
  ApiService.setHeader();
  const response = await ApiService.post("/api/app", payload);
  return response.data;
};

export const getAllApps = async (): Promise<GetAllAppsResponse> => {
  ApiService.setHeader();
  const response = await ApiService.get("/api/app");
  return response.data;
};

export const updateApp = async (
  payload: Partial<AppType>
): Promise<CommonErrorResponse> => {
  ApiService.setHeader();
  const response = await ApiService.put("/api/app", payload);
  return response.data;
};
