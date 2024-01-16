import { isAuthenticated } from "./routes/auth";

const ID_TOKEN_KEY: string = "token";

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY) || getCookie(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue !== undefined ? decodeURIComponent(cookieValue) : "";
  }

  return "";
}

export const deleteCookie = (): void => {
  document.cookie = `${ID_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export async function checkIfIsAuthenticated(): Promise<boolean> {
  try {
    const response = await isAuthenticated();
    if (response?.data?.auth) return true;
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
