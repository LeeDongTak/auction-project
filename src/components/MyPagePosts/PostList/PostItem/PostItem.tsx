import { Auction_post } from "../../../../types/databaseRetrunTypes";

const PostItem = ({ post }: { post: Auction_post }) => {
  return <div>{post.title}</div>;
};

export default PostItem;
