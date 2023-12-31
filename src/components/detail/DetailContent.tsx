import React from "react";

type Props = {
  auctionContent: string | undefined;
};
const DetailContent = ({ auctionContent }: Props) => {
  return (
    <>
      <p>{auctionContent}</p>
    </>
  );
};

export default React.memo(DetailContent);
