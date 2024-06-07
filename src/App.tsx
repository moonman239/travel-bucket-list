import React from "react";
export default function App()
{
  const [location,setLocation] = React.useState<string>("");
  const [locations, setLocations] = React.useState<string[]>([]); // [1]

  const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
    setLocations([...locations, location]);


  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add location to state
    setLocation(e.target.value);
  };
  return (
    <div className="container">
        <h1>Travel Bucket List</h1>
        <form id="locationForm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} id="locationInput" placeholder="Enter location" required />
            <button type="submit">Add Location</button>
        </form>
        <ul id="bucketList">{locations.map((l)=><li>{l}</li>)}</ul>
    </div>
  );
}
