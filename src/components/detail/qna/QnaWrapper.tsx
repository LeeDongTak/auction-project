import Question from "./Question";
import Title from "../bidPopup/Title";
import { Spacer } from "../../ui/Spacer";

export const QnaWrapper = () => {
  return (
    <>
      <Title title={"질문"} titleAlign={"flex-start"} />
      <Spacer y={10} />
      <Question />
      <Spacer y={100} />
    </>
  );
};
