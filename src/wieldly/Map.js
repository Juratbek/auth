import React, {useEffect} from "react";

const Map = ({setCoords, coords}) => {

    useEffect(()=>{
        if (navigator.geolocation){
            alert('Please click "allow" or "разрешить" to give access!');
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }else {
            alert('Geolocation is not supported by this browser!')
        }
    }, []);

    function getCoordinates(position){
        setCoords([position.coords.latitude, position.coords.latitude])
    }

    return (
        <>
            {coords ? <h4 className="gx-text-center gx-text-green">Your location has been taken</h4>:
                <h4 className="gx-text-center gx-text-danger">Your location hasn't been taken. Please check the settings!</h4>}

        </>
    )
};

export default Map