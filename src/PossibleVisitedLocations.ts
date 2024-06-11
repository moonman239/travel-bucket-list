import * as React from 'react';
import haversineDistance from './Haversine';
import Location from './Location';
export default function useGetPossibleVisitedLocations(locations: Location[])
{
    const [possibleVisited, setPossibleVisited] = React.useState<Location[]>([]);
    console.log("Checking location");
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setPossibleVisited(locations.filter((location) => {
            const distance = haversineDistance([location.longitude, location.latitude], [lon, lat], false);
            return distance <= 100;
        }));
    },(error)=>console.error(`error getting location: ${error.message}`));
    return possibleVisited;
}