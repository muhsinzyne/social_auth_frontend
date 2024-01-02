import router from "@/router";

export const handleNavigate = (path: string): void => {
  router.push({ name: path });
};
