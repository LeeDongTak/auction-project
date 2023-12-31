import { styled } from "styled-components";
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

const StDetailContentWrapper = styled.section`
  max-width: 80%;
  margin: 0 auto;
  font-size: 1.6rem;
  line-height: 1.5;
  padding: 20px;
`;
export default React.memo(DetailContent);
