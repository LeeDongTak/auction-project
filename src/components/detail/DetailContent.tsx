type Props = {
  auctionContent: string | undefined;
};
const DetailContent = ({ auctionContent }: Props) => {
  return <section>{auctionContent}</section>;
};
export default DetailContent;
