import Question from "./Question";
import Title from "../bidPopup/Title";
import { Spacer } from "../../ui/Spacer";

interface Props {
  auctionId: string;
}
export const QnaWrapper = ({ auctionId }: Props) => {
  return (
    <>
      <Title title={"Q&A"} titleAlign={"flex-start"} />
      <Spacer y={20} />
      <Question auctionId={auctionId!} />
      <Spacer y={20} />
    </>
  );
};
