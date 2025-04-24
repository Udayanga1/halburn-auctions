import { useState } from "react";

export default function AddAuctionForm() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    startTime: "",
    endTime: "",
    category: "",
    photos: [],
  });

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      if (files.length > 4) {
        alert("You can only upload up to 4 photos.");
        return;
      }
      setForm({ ...form, photos: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // onAddAuction(form); // Pass auction to Dashboard
    console.log(form);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "title": form.title,
      "description": form.description,
      "price": form.price,
      "startTime": form.startTime,
      "endTime": form.endTime,
      "sellerId": 2,
      "categoryId": 101,
      "type": "OPEN"
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8080/auction/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    
    setForm({
      title: "",
      description: "",
      price: "",
      startTime: "",
      endTime: "",
      category: "",
      photos: [],
    }); // Reset form
  };

  return(
    <header>
      <div className="mt-4 p-4 rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Add New Auction</h3>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} type="text" className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}/>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}/>
        </div>
        <div>
          <label className="block text-sm font-medium">Starting Price</label>
          <input name="price" type="number" value={form.price} className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}/>
        </div>
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input name="startTime" type="datetime-local" value={form.startTime} className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}/>
        </div>
        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input name="endTime" type="datetime-local" value={form.endTime} className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}/>
        </div>

        {/* Category Dropdown */}
        <div>
          <label  className="block text-sm font-medium">Category</label>
          <select name="category" value={form.category} className="w-full px-3 py-2 border border-violet-500 rounded" onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="art">Art</option>
            <option value="fashion">Fashion</option>
            <option value="antiques">Antiques</option>
            <option value="collectibles">Collectibles</option>
          </select>
        </div>

        {/* Photo Uploads */}
        <div>
          <label className="block text-sm font-medium">Add Photos (up to 4)</label>
          <input
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="bg-violet-500 w-60 rounded p-2"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 4 photos allowed.</p>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
      </form>
    </div>
    </header>
  )
}