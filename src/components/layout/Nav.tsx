import { useQuery } from "@tanstack/react-query";
import { Dropdown, MenuProps, Spin } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { getUserInfo } from "../../api/auth";
import { QUERY_KEYS } from "../../query/keys.constant";
import { resetState } from "../../redux/modules/setAuctionSlice";
import ProfileAvatar from "../common/Avatar";

interface Props {
  signOut: () => Promise<void>;
  userId?: string;
}

const Nav: React.FC<Props> = ({ signOut, userId }) => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserInfo(userId as string),
  });

  const items: MenuProps["items"] = [
    {
      label: <StLink to="/profile">프로필</StLink>,
      key: "0",
    },
    {
      label: <StLink to="/setAuction"
        onClick={() => {
          dispatch(resetState())
        }}
      >글 작성하기</StLink>,
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

  if (isLoading) return <Spin />;

  return (
    <StDropdown menu={{ items }} trigger={["click"]} placement="topRight" arrow>
      <a onClick={(e) => e.preventDefault()}>
        <ProfileAvatar
          size="4rem"
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
  width: 50px;
  gap: 5rem;
  cursor: pointer;
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
