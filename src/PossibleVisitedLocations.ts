import * as React from 'react';
import haversineDistance from './Haversine';
import Location from './Location';
export default function useGetPossibleVisitedLocations(locations: Location[])
{
    const [possibleVisited, setPossibleVisited] = React.useState<Location[]>([]);
    const [calculating, setCalculating] = React.useState<boolean>(true);
    const [error, setError] = React.useState<GeolocationPositionError | null>(null);
    console.log("Checking location");
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCalculating(false);
        setPossibleVisited(locations.filter((location) => {
            const distance = haversineDistance([location.longitude, location.latitude], [lon, lat], false);
            return distance <= 100;
        }));
    },(error)=>{
        setCalculating(false);
        setError(error);
});
    return {possibleVisited, calculating, error};
}