import { useQuery } from "@tanstack/react-query";
import { fetchGetAuctions } from "../api/auction";

const Profile = () => {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: fetchGetAuctions });
  console.log(data);

  return <div>마이페이지</div>;
};

export default Profile;
