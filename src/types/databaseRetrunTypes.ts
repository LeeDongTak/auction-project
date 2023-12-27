export type Auction_post = {
  auction_end_date: string;
  auction_id: string;
  auction_start_date: string;
  auction_status: string;
  category_id: string | null;
  content: string;
  created_at: string;
  lower_limit: number;
  product_img: string | null;
  product_status: string;
  shipping_type: string;
  title: string;
  upper_limit: number;
  user_id: string;
  category: { category_name: string };
};
