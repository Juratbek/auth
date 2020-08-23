import React, {useEffect} from "react";

const Map = ({setCoords}) => {

    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }else {
            alert('Geolocation is not supported by this browser!')
        }
    }, [getCoordinates]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getCoordinates(position){
        setCoords([position.coords.latitude, position.coords.latitude])
    }

    return (
        <>
            <h4 className="gx-text-center gx-text-green">Your location has been taken</h4>
        </>
    )
};

export default Map