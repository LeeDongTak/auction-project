const useGetUserInfo = () => {
  const { user } = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  return user;
};

export default useGetUserInfo;
