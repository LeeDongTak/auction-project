import type Icon from "@ant-design/icons";
import { Avatar, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

interface IconTextProps {
  icon: typeof Icon;
  text: React.ReactNode;
}

interface listDataValues {
  title: string;
  avatar: string;
  content: string;
  href?: string;
}

const ListSkeleton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const listData: listDataValues[] = [];

  for (let i = 1; i < 6; i++) {
    listData.push({
      title: `User ${i}`,
      avatar: "~~~",
      content: "~~~~~~~",
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Skeleton
              loading={isLoading}
              active
              avatar
              title={{ width: "100px" }}
              paragraph={{ width: "400px", rows: 2 }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListSkeleton;
