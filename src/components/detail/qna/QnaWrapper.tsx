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
      <Title title={"Q&A"} titleAlign={"flex-start"} />
      <Spacer y={20} />
      <Question auctionId={auctionId!} auctionUserId={auctionUserId} />
      <Spacer y={20} />
    </>
  );
};
