import connectSupabase from "./connectSupabase";
import { Auction_question } from "../types/databaseRetrunTypes";

export const fetchPostQuestion = async (
  questionData: Pick<Auction_question, "user_id" | "auction_id" | "question">
) => {
  const { error } = await connectSupabase
    .from("auction_question")
    .insert(questionData)
    .select();
  if (error) throw error;
};

export const fetchGetQuestions = async (auction_id: string) => {
  const { data, error } = await connectSupabase
    .from("auction_question")
    .select("*, user_info(*), auction_answer(*)")
    .eq("auction_id", auction_id)
    .order("created_at", { ascending: false })
    .returns<Auction_question[]>();

  if (error) throw error;

  return data;
};

export const fetchDeleteQuestion = async (auction_question_id: string) => {
  const { error } = await connectSupabase
    .from("auction_question")
    .delete()
    .eq("auction_question_id", auction_question_id);

  if (error) throw error;
};

export const fetchUpdateQuestion = async (
  question: Pick<Auction_question, "question" | "auction_question_id">
) => {
  const { data, error } = await connectSupabase
    .from("auction_question")
    .update(question)
    .eq("auction_question_id", question.auction_question_id)
    .select();

  if (error) throw error;

  return data;
};
