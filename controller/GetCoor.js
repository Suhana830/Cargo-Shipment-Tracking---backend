import axios from 'axios';

export const get_Coordinates = async (location) => {

    try {

        const url = `https://geocode.maps.co/search?q=${location}&api_key=${process.env.Api_key}`

        const res = await axios.get(url);
        const data = res.data;

        if (!data || data.length === 0) {
            console.log("No results found for location");
            return null;
        }

        const topResult = data[0]; // index 0 = topmost result
        const lat = parseFloat(topResult.lat);
        const lon = parseFloat(topResult.lon);



        return { lat, lon };

    } catch (error) {
        return null;
    }
}