import * as React from "react"
import haversineDistance from "./Haversine";
import Location from "./Location";
import "./Modal.css";
function Modal(props: {locations: Location[]})
{
    return (
    <div id="modal" className="modal">
        <div className="modal-content">
            <span className="close-button">&times;</span>
            <h2>Nearby Locations</h2>
            <p>You are near the following locations. Have you visited any of them?</p>
            <ul id="nearbyLocationsList">
                {props.locations.map((location, index) => (
                    <li key={index}>
                        <input type="checkbox" id={`location${index}`} />
                        <label htmlFor={`location${index}`}>{location.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
}


export default function useModal(locations: Location[])
{
    const [modal,setModal] = React.useState<JSX.Element | null>(null);
    console.log("Checking location");
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const possibleVisited = locations.filter((location) => {
            const distance = haversineDistance([location.longitude, location.latitude], [lon, lat], false);
            return distance <= 100;
        });
        if (possibleVisited.length > 0)
            {
                console.log(`You are near ${possibleVisited.length} locations`);
                setModal(<Modal locations={possibleVisited} />)
            }
    },(error)=>console.error(`error getting location: ${error.message}`));
    return modal;
}