import React, {useDebugValue} from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

const map = () => {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 41.316440, lng: 69.294860}}
        />
    )
};

const WrappedMap = withScriptjs(withGoogleMap(map));

export default function () {
    return (
        <div style={{height:400}}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
                libraries=geometry,drawing,places&key=AIzaSyCQ3-zfjYcY9Txh7k_MYhq4whVNUoOoF60`}
                loadingElement={<div className="gx-h-100" style={{height: '100%'}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
            {/*<h4>map here</h4>*/}
        </div>
    )
}