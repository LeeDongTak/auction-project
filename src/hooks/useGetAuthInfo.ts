import { Auth } from "../types/userType";

const useGetAuthInfo = () => {
  const storedUser = localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token");
  const user: Auth | null = storedUser ? JSON.parse(storedUser) : null;
  return user;
};

export default useGetAuthInfo;
