import React from "react";
import GoogleMaps from 'simple-react-google-maps'
import { REACT_APP_KEY_GOOGLE_MAPS } from "../../utils/config";


export default function Map(props){

    return (
        <GoogleMaps 
            apiKey={REACT_APP_KEY_GOOGLE_MAPS}
            style={{
                width: '50rem',
                height: '40rem'
            }}
            zoom={10}
            center={{lat: -34.79593901008936, lng: -58.279638974740614}}
            markers={[{lat: -34.79593901008936, lng: -58.279638974740614}]}
        />
    )
}
