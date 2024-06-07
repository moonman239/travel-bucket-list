import React from "react";
export default function App()
{
  const handleSubmit = async (e: React.FormEvent) => {
    alert("submission");
  };
  return (
    <div className="container">
        <h1>Travel Bucket List</h1>
        <form id="locationForm" onSubmit={handleSubmit}>
            <input type="text" id="locationInput" placeholder="Enter location" required />
            <button type="submit">Add Location</button>
        </form>
        <ul id="bucketList"></ul>
    </div>
  );
}
