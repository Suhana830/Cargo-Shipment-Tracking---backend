function haversineDistance(coord1, coord2) {
    const R = 6371; // Radius of Earth in kilometers

    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lon - coord1.lon) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(coord1.lat * Math.PI / 180) *
        Math.cos(coord2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
}

export function calculateETA(coord1, coord2, averageSpeed = 26) {
    const distance = haversineDistance(coord1, coord2); // in km
    const timeInHours = distance / averageSpeed;
    const etaTimestamp = Date.now() + timeInHours * 60 * 60 * 1000;

    return new Date(etaTimestamp);
}