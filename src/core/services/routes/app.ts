import {
  AppType,
  CommonErrorResponse,
  CreateAppResponse,
  GetAllAppsResponse,
  GetSingleAppResponse,
} from "@/common/types/types";
import ApiService from "../APIService";

export const addApp = async (
  payload: AppType | Partial<AppType>
): Promise<CreateAppResponse> => {
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

export const deleteApp = async (slug: string): Promise<CommonErrorResponse> => {
  ApiService.setHeader();
  const response = await ApiService.delete("/api/app", slug);
  return response.data;
};

export const getSingleApp = async (
  appId: AppType["appId"]
): Promise<GetSingleAppResponse> => {
  ApiService.setHeader();
  const response = await ApiService.get("/api/app", appId);
  return response.data;
};
