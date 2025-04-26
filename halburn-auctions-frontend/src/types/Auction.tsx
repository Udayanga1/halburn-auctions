export interface Auction {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  currentBid: number;
  startTime: string;
  endTime: string;
  sellerId: number;
  imageUrls: string[];
}