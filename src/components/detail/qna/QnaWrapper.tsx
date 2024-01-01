import Question from "./Question";
import Title from "../bidPopup/Title";
import { Spacer } from "../../ui/Spacer";

interface Props {
  auctionId: string;
  auctionUserId: string;
}
export const QnaWrapper = ({ auctionId, auctionUserId }: Props) => {
  return (
    <>
      <Title title={"질문"} titleAlign={"flex-start"} />
      <Spacer y={10} />
      <Question auctionId={auctionId!} auctionUserId={auctionUserId} />
      <Spacer y={100} />
    </>
  );
};
