import { useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
  const { auctionId } = useParams();

  return (
    <StDetailWrapper>
      <section>
        <h2>Detail</h2>
        <p>{auctionId}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque
          consectetur cum cumque delectus deleniti dolores excepturi fugit id
          labore libero magni, necessitatibus nulla omnis quaerat quis tempore
          totam vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ab atque consectetur cum cumque delectus deleniti dolores excepturi
          fugit id labore libero magni, necessitatibus nulla omnis quaerat quis
          tempore totam vitae. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ab atque consectetur cum cumque delectus deleniti
          dolores excepturi fugit id labore libero magni, necessitatibus nulla
          omnis quaerat quis tempore totam vitae.
        </p>
      </section>
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

export default Detail;
