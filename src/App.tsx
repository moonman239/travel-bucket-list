import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from 'react-leaflet';
import { Marker } from "react-leaflet";
import { Popup,TileLayer } from "react-leaflet";
import "./App.css";

type OpenStreetMapFeature = {type: 'Feature',geometry:{type:'Point',coordinates:[number,number]},properties:{name:string}};
type OpenStreetMapResponse = {features: OpenStreetMapFeature[]};
export default function App()
{
  const [locationName,setLocationName] = React.useState<string>("");
  const [locations, setLocations] = React.useState<{name: string,latitude:number,longitude:number}[]>([]); // [1]
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
  const addFeature = (feature: OpenStreetMapFeature)=>{
      console.log(`adding feature ${JSON.stringify(feature)} to locations`);
      const lat = feature.geometry.coordinates[1];
      const lon = feature.geometry.coordinates[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      setLocations([...locations, {name: locationName, latitude: lat, longitude: lon}]);
    localStorage.setItem("locations", JSON.stringify(locations));
  }
  const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
    console.log(`fetching location data for ${locationName}`);
    // fetch location data
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=geocodejson&q=${locationName}`);
    const data = await response.json() as OpenStreetMapResponse;
    console.log(`${data.features.length} features found for ${locationName}`);
    if (data.features.length === 1)
    {
      addFeature(data.features[0]);
      setFeatures([]);
    }
    else
      setFeatures(data.features);
  };
  const handleTextboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add location to state
    setLocationName(e.target.value);
  };
  const handleFeatureSelect = (feature: OpenStreetMapFeature) => {
    setLocationName(feature.properties.name);
    addFeature(feature);
    setFeatures([]);
  }
  const [features,setFeatures] = React.useState<OpenStreetMapFeature[]>([]); // OpenStreetMap features to choose from.
  console.log(`api features: ${JSON.stringify(features)}`)
  return (
 <div className="container">
        <h1>Travel Bucket List</h1>
        <form id="locationForm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleTextboxChange} id="locationInput" placeholder="Enter location" required />
            <button type="submit" disabled={!locationName}>Add Location</button>
        </form>
        <div className="location-results">
                    {features.map((feature, index) => (
                        <div key={index} className="location-result" onClick={() => handleFeatureSelect(feature)}>
                            {feature.properties.name}
                        </div>
                    ))}
                </div>
        <div className="table-container">
            <table id="bucketListTable">
                <thead>
                    <tr>
                        <th>Visited</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((_location, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={locationVisited[index]}
                                    onChange={(e) => {
                                        const newLocationVisited = [...locationVisited];
                                        newLocationVisited[index] = e.target.checked;
                                        setLocationVisited(newLocationVisited);
                                        localStorage.setItem("locationVisited", JSON.stringify(newLocationVisited));
                                    }}
                                />
                            </td>
                            <td>{_location.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="map-wrapper">
        <MapContainer className="map-container" center={[0,0]} zoom={1} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((_location) => (
                <Marker key={_location.name} position={[_location.latitude, _location.longitude]}>
                    <Popup>{_location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
        </div>
    </div>
  );
}
