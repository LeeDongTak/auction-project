// auction 전체 호출 (조건에 따라 필터링 호출)
import moment from "moment";
import {
  Auction_images,
  Insert_auction_post,
  Update_auction_post,
} from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

// 경매품 등록
export const AddAuctionPost = async (addAuctionData: {
  newAuctionData: Insert_auction_post;
  imgFileList: File[];
}) => {
  try {
    const { newAuctionData, imgFileList } = addAuctionData;
    const insertData = await connectSupabase
      .from("auction_post")
      .insert(newAuctionData)
      .select();
    if (insertData.error) throw new Error(insertData.error.message);
    for (let i = 0; i < imgFileList.length; i++) {
      const insertImgFile = await connectSupabase.storage
        .from("auction_images")
        .upload(
          `${insertData?.data?.[0]?.auction_id}/${moment().format(
            "YYYY-MM-DD-HH:mm:ss"
          )}/${imgFileList[i].name}`,
          imgFileList[i]
        );
      if (insertImgFile.error) throw new Error(insertImgFile.error.message);
      const insertAuctionImg = await connectSupabase
        .from("auction_images")
        .insert([
          {
            image_path: `https://fzdzmgqtadcebrhlgljh.supabase.co/storage/v1/object/public/auction_images/${insertImgFile?.data?.path}`,
            auction_id: insertData?.data?.[0]?.auction_id,
          } as any,
        ]);
      if (insertAuctionImg.error)
        throw new Error(insertAuctionImg.error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// 경매품 수정

export const updateAuctionPost = async (updateAuctionData: {
  newAuctionData: Update_auction_post;
  imgFileList: File[];
  deleteImgUrl?: Auction_images[];
  auctionId?: string;
}) => {
  const { newAuctionData, imgFileList, deleteImgUrl, auctionId } =
    updateAuctionData;
  if (auctionId) {
    const updateData = await connectSupabase
      .from("auction_post")
      .update(newAuctionData)
      .eq("auction_id", auctionId)
      .select();
    if (updateData.error) throw new Error(updateData.error.message);
    if (imgFileList.length !== 0) {
      for (let i = 0; i < imgFileList.length; i++) {
        const updateImgFile = await connectSupabase.storage
          .from("auction_images")
          .upload(
            `${auctionId}/${moment().format("YYYY-MM-DD-HH:mm:ss")}/${
              imgFileList[i].name
            }`,
            imgFileList[i]
          );
        if (updateImgFile.error) throw new Error(updateImgFile.error.message);
        const updateAuctionImg = await connectSupabase
          .from("auction_images")
          .insert([
            {
              image_path: `https://fzdzmgqtadcebrhlgljh.supabase.co/storage/v1/object/public/auction_images/${updateImgFile?.data?.path}`,
              auction_id: auctionId,
            } as any,
          ]);
        if (updateAuctionImg.error)
          throw new Error(updateAuctionImg.error.message);
      }
    }
    if (deleteImgUrl) {
      for (let i = 0; i < deleteImgUrl.length; i++) {
        const { image_path } = deleteImgUrl[i];
        if (image_path) {
          const { error: auction_image_error } = await connectSupabase
            .from("auction_images")
            .delete()
            .eq("image_path", image_path);
          if (auction_image_error) throw new Error(auction_image_error.message);
          let deleteImgFile = image_path?.replace(
            "https://fzdzmgqtadcebrhlgljh.supabase.co/storage/v1/object/public/",
            ""
          );
          const { data, error } = await connectSupabase.storage
            .from("auction_image")
            .remove([deleteImgFile]);
        }
      }
    }
  }
};

export const deleteAuctionPost = async (deleteAuctionData: {
  auction_id?: string;
  auction_images?: Auction_images[];
}) => {
  const { auction_id, auction_images } = deleteAuctionData;
  if (auction_id) {
    const { error: AuctionImageError } = await connectSupabase
      .from("auction_images")
      .delete()
      .eq("auction_id", auction_id);
    if (AuctionImageError) throw new Error(AuctionImageError.message);
    const { error: AuctionPostError } = await connectSupabase
      .from("auction_post")
      .delete()
      .eq("auction_id", auction_id);
    if (AuctionPostError) throw new Error(AuctionPostError.message);
    if (auction_images) {
      for (let i = 0; i < auction_images.length; i++) {
        const { image_path } = auction_images[i];
        if (image_path) {
          let deleteImgFile = image_path?.replace(
            "https://fzdzmgqtadcebrhlgljh.supabase.co/storage/v1/object/public/",
            ""
          );
          const { data, error } = await connectSupabase.storage
            .from("auction_image")
            .remove([deleteImgFile]);
          if (error) throw new Error(error.message);
        }
      }
    }
  }
};
