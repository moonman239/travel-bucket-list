import * as React from "react"
import Location from "./Location";
import "./Modal.css";
export default function Modal(props: {locations: Location[], onClose: () => void, onConfirm: (locations: Location[]) => void})
{
    return (
    <div id="modal" className="modal">
        <div className="modal-content">
            <span className="close-button" onClick={props.onClose}>&times;</span>
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
            <button onClick={() => {
                const visitedLocations = props.locations.filter((location, index) => {
                    const checkbox = document.getElementById(`location${index}`) as HTMLInputElement;
                    return checkbox.checked;
                });
                props.onConfirm(visitedLocations);
            }}>Confirm</button>
        </div>
    </div>
);
}


