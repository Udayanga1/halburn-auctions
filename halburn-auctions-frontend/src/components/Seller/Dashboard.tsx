import { useState } from "react";
import AuctionItem from "./AuctionItem";
import AddAuctionForm from "./AddAuctionForm";

export default function Dashboard() {

  const [showForm, setShowForm] = useState(false);

  return(
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200">
        <nav className="mt-6">
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-tachometer-alt w-5"></i><span className="ml-3 font-medium">Dashboard</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-box w-5"></i><span className="ml-3">Auctions</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-chart-line w-5"></i><span className="ml-3">Reports</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-star w-5"></i><span className="ml-3">Reviews</span></a></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">          
        <button
            onClick={() => setShowForm(prev => !prev)}
            className="px-4 py-2 bg-violet-500 text-white text-sm font-medium rounded hover:bg-violet-600 focus:outline-none"
          >
            {showForm ? "Hide Form" : "Add New Auction Product"}
          </button>

          <div className="flex items-center border border-gray-300 rounded">
            <input type="text" placeholder="Search ..." className="px-3 py-1 text-sm focus:outline-none" />
            <button className="px-3 py-1 text-sm font-medium text-gray-700 border-l border-gray-300 hover:bg-gray-50">Search</button>
          </div>
        </div>

        {showForm && <AddAuctionForm />}

        <div className="mt-6 grid grid-cols-1">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-violet-500 pl-2">Recent Auctions</h3>
            <div className="flex flex-wrap gap-2">
              <AuctionItem />
              <AuctionItem />
              <AuctionItem />
              <AuctionItem />
              <AuctionItem />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
