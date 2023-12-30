// auction 전체 호출 (조건에 따라 필터링 호출)
import moment from "moment";
import { insert_Auction_post } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

export const AddAuctionPost = async (addAuctionData: {
  newAuctionData: insert_Auction_post;
  imgFileList: File[];
}) => {
  try {
    const { newAuctionData, imgFileList } = addAuctionData;
    const insertData = await connectSupabase
      .from("auction_post")
      .insert(newAuctionData)
      .select();
    for (let i = 0; i < imgFileList.length; i++) {
      const insertImgFile = await connectSupabase.storage
        .from("auction_images")
        .upload(
          `${insertData?.data?.[0]?.auction_id}/${moment().format(
            "YYYY-MM-DD-HH-MM-SS"
          )}/${imgFileList[i].name}`,
          imgFileList[i]
        );
      await connectSupabase.from("auction_images").insert([
        {
          image_path: `https://fzdzmgqtadcebrhlgljh.supabase.co/storage/v1/object/public/auction_images/${insertImgFile?.data?.path}`,
          auction_id: insertData?.data?.[0]?.auction_id,
        } as any,
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};
