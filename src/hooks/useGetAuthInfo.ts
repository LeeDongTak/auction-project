import { Auth } from "../types/userType";

const useGetAuthInfo = () => {
  const user: Auth = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );
  return user;
};

export default useGetAuthInfo;
