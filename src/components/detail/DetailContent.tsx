import React from "react";
import { useSelector } from "react-redux";
import { selectorAuctionSingleData } from "../../redux/modules/auctionSingleDataSlice";

const DetailContent = () => {
  const {
    auctionData: { content },
  } = useSelector(selectorAuctionSingleData);
  return (
    <>
      <p>{content}</p>
    </>
  );
};

export default React.memo(DetailContent);
