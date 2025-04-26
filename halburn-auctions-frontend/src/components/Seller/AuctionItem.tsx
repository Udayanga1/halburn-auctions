import { AuctionItemProps } from "../../types/AuctionItemProps";

export default function AuctionItem({
  title,
  category,
  description,
  price,
  currentBid,
  startTime,
  endTime,
  sellerId,
  imageUrl,
}: AuctionItemProps) {
  return(
    <div className="relative max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden min-w-3xs">
      <img src="#" alt="#" className="w-full h-48 object-cover" />

      <button className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.591 1.01c.77-.54 1.692.252 1.414 1.118a1.724 1.724 0 001.307 2.199c.96.28.96 1.683 0 1.962a1.724 1.724 0 00-1.307 2.198c.278.867-.644 1.658-1.414 1.118a1.724 1.724 0 00-2.591 1.01c-.299.921-1.602.921-1.902 0a1.724 1.724 0 00-2.591-1.01c-.77.54-1.692-.252-1.414-1.118a1.724 1.724 0 00-1.307-2.198c-.96-.28-.96-1.683 0-1.962a1.724 1.724 0 001.307-2.199c-.278-.866.644-1.658 1.414-1.118a1.724 1.724 0 002.591-1.01z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{category}</p>

        <div className="mt-4 text-sm text-gray-700 space-y-2">
          <p>Starting Price <span className="font-medium">Rs {price}</span>, Current Bid <span className="font-medium">Rs {currentBid}</span></p>
          <p>Seller <span className="font-medium"> {sellerId}</span></p>
          <p>Bid Start Time <span className="font-medium">{startTime}</span></p>
          <p>Bid End Time <span className="font-medium">{endTime}</span></p>
        </div>
      </div>
    </div>
  )
}