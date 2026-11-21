const API_KEY = import.meta.env.VITE_OPENCAGE_KEY

export const getAddress = async (lat, lng) => {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`)
    const data = await response.json()
    return data
}
