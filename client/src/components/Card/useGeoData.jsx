import axios from "axios";
import { useEffect, useState } from "react";

const useGeoData = ({location, country}) => {
    const [geoCoordonate, setGeoCoordonate] = useState('')
    
    const geoData = async () => {
    const data = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=${country}&type=place&limit=1&access_token=pk.eyJ1Ijoidm95YWdlc2xhbGFudGhhMTk4NyIsImEiOiJja3hkYjB4bGswYzFvMnFuNGZ6OGo3YWNoIn0.n9SsSfkBoyKyY5gmgg3aew`
      )
      .then((res) =>console.log(res.data.features[0].center[0]))
      /* setFetchData(dadta) */
    }
  
    useEffect(() => {
      geoData()
    }, [])

    return {geoCoordonate}
}

export default useGeoData