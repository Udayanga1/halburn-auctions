import { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";
import AddAuctionForm from "./AddAuctionForm";
import { Auction } from "../../types/Auction";
import { User } from "../../types/User";

interface DashboardProps {
  user: User;
  onSignOut: () => void;
}

export default function Dashboard({ user, onSignOut }: DashboardProps) {

  const [showForm, setShowForm] = useState(false);
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    // Make sure this matches your backend mapping (often /api/auction/all)
    fetch("http://localhost:8080/auction/all")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Auction[]) => {
        console.log("Fetched auctions:", data);
        setAuctions(data);
      })
      .catch(err => console.error("Error fetching auctions:", err));
  }, []);

  // handler for newly added auction
  const handleAdd = (newAuction: Auction) => {
    setAuctions(prev => [newAuction, ...prev]);
    setShowForm(false);
  };

  return(
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200">
      <h4 className="indent-4 font-bold mb-4">Welcome, {user.name}!</h4>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-tachometer-alt w-5"></i><span className="ml-3 font-medium">Dashboard</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-box w-5"></i><span className="ml-3">Auctions</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-chart-line w-5"></i><span className="ml-3">Reports</span></a></li>
            <li><a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"><i className="fas fa-star w-5"></i><span className="ml-3">Reviews</span></a></li>
          </ul>
        </nav>
        <div className="flex mt-14">
          <button onClick={onSignOut} className="bg-white hover:bg-violet-500 border border-violet-500 hover:text-white font-bold py-2 px-4 rounded mx-auto">Sign Out</button>
        </div>

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

        {showForm && <AddAuctionForm user={user} onAdd={handleAdd} />}

        <div className="mt-6 grid grid-cols-1">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-violet-500 pl-2">Recent Auctions</h3>
            <div className="flex flex-wrap gap-2">
            {auctions.map((item) => (
              item.sellerId == user.id ? 
              <AuctionItem
                key={item.id}
                title={item.title}
                category={item.category}
                description={item.description}
                startPrice={item.price}
                currentBid={item.currentBid}
                startTime={item.startTime}
                sellerId={item.sellerId}
                endTime={item.endTime}
                // imageUrl={item.imageUrls[0]}
                imageUrl=""
              /> : ""
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
