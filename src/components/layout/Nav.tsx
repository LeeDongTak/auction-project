import { useQuery } from "@tanstack/react-query";
import { Dropdown, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { getUserInfo } from "../../api/auth";
import ProfileAvatar from "../../common/avatar";

interface Props {
  signOut: () => Promise<void>;
  userId?: string;
}

const Nav: React.FC<Props> = ({ signOut, userId }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(userId as string),
  });

  console.log("user", user?.[0]?.profile_image);

  const items: MenuProps["items"] = [
    {
      label: <StLink to="/profile">프로필</StLink>,
      key: "0",
    },
    {
      label: <StLink to="/addAuction">글 작성하기</StLink>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <StSignOutButton onClick={signOut}>로그아웃</StSignOutButton>,
      key: "3",
    },
  ];

  return (
    <StDropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <ProfileAvatar
          size="5rem"
          alt="header profile"
          src={user?.[0]?.profile_image as string}
        />
      </a>
    </StDropdown>
  );
};

const StDropdown = styled(Dropdown)`
  display: flex;
  justify-content: flex-end;
  width: 200px;
`;

const StSignOutButton = styled.span`
  width: 200px;
  padding: 1rem 10rem 1rem 0;
  font-size: large;
`;

const StLink = styled(Link)`
  font-size: large;
`;

export default Nav;
