import connectSupabase from "./connectSupabase";
import { Auction_question } from "../types/databaseRetrunTypes";

export const fetchPostQuestion = async (
  questionData: Pick<Auction_question, "user_id" | "auction_id" | "question">
) => {
  const { data, error } = await connectSupabase
    .from("auction_question")
    .insert(questionData)
    .select();
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
