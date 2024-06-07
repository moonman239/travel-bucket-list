import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from 'react-leaflet';
import { Marker } from "react-leaflet";
import { Popup,TileLayer } from "react-leaflet";
export default function App()
{
  const [location,setLocation] = React.useState<string>("");
  const [locations, setLocations] = React.useState<string[]>([]); // [1]
  const [locationVisited,setLocationVisited] = React.useState<boolean[]>([]); // [2
  useEffect(() => {
    const locations = localStorage.getItem("locations");
    if (locations) {
      setLocations(JSON.parse(locations));
    }
    const locationVisited = localStorage.getItem("locationVisited");
    if (locationVisited) {
      setLocationVisited(JSON.parse(locationVisited));
    }  
  },[]);
  const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
    setLocations([...locations, location]);
    localStorage.setItem("locations", JSON.stringify([...locations, location]));
  };
  const handleTextboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add location to state
    setLocation(e.target.value);
  };
  return (
    <div className="container">
        <h1>Travel Bucket List</h1>
        <form id="locationForm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleTextboxChange} id="locationInput" placeholder="Enter location" required />
            <button type="submit">Add Location</button>
        </form>
        <table id="bucketListTable">
            <thead>
                <tr>
                    <th>Visited</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (<tr key={index}>
                <td>
                  <input type="checkbox" checked={locationVisited[index]} onChange={(e) => {
                    const newLocationVisited = [...locationVisited];
                    newLocationVisited[index] = e.target.checked;
                    setLocationVisited(newLocationVisited);
                    localStorage.setItem("locationVisited", JSON.stringify(newLocationVisited));
                  }} />
                </td>
                <td>{location}</td>
                </tr>))}
            </tbody>
        </table>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height:"100vh"}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
  );
}
