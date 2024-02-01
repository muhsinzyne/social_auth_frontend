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

export function setCookie(name: string, value: string, daysToExpire: number) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieValue =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
  document.cookie = cookieValue;
}
