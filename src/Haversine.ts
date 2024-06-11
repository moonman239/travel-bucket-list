/**
 * Calculates the distance between two coordinates.
 * Credit: Nathan Lippi https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
 * @param coords1 
 * @param coords2 
 * @param isMiles 
 * @returns 
 */
export default function haversineDistance (coords1: number[], coords2: number[], isMiles: boolean) {
  function toRad(x: number) {
    return x * Math.PI / 180;
  }

  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if(isMiles) d /= 1.60934;

  return d;
}
