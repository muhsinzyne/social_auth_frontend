import router from "@/router";

export const handleNavigate = (path: string): void => {
  router.push({ name: path });
};

export const addToSessionStorage = (key: string, value: string) => {
  window.sessionStorage.setItem(key, value);
};

export const getFromSessionStorage = (key: string) => {
  return window.sessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key: string) => {
  window.sessionStorage.removeItem(key);
};
