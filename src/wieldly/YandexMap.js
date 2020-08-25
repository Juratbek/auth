import React, {useState} from "react";

import {
    YMaps,
    Map,
    ZoomControl,
    Placemark,
    FullscreenControl,
    GeolocationControl,
    TypeSelector, ListBox, ListBoxItem
} from 'react-yandex-maps';


const cities = [
    {
        data: {content: 'Farg`ona'},
        options: {selectOnClick: false},
        coords: [40.390060, 71.790321],
    },
    {
        data: {content: 'Namangan'},
        options: {selectOnClick: false},
        coords: [40.993599, 71.677452],
    },
    {
        data: {content: 'Andijon'},
        options: {selectOnClick: false},
        coords: [40.782621, 72.348339],
    },
    {
        data: {content: 'Toshkent'},
        options: {selectOnClick: false},
        coords: [41.316440, 69.294860],
    },
    {
        data: {content: 'Samarqand'},
        options: {selectOnClick: false},
        coords: [39.647099, 66.960289],
    },
    {
        data: {content: 'Navoiy'},
        options: {selectOnClick: false},
        coords: [40.094266, 65.379945],
    },
    {
        data: {content: 'Qarshi'},
        options: {selectOnClick: false},
        coords: [38.839980, 65.792794],
    },
    {
        data: {content: 'Jizzax'},
        options: {selectOnClick: false},
        coords: [40.1331797, 67.8234081],
    },
    {
        data: {content: 'Buxoro'},
        options: {selectOnClick: false},
        coords: [39.7675529, 64.4231326],
    },
    {
        data: {content: 'Guliston'},
        options: {selectOnClick: false},
        coords: [40.484857, 68.773982],
    },
    {
        data: {content: 'Nukus'},
        options: {selectOnClick: false},
        coords: [42.4586038, 59.6058539],
    },
    {
        data: {content: 'Termiz'},
        options: {selectOnClick: false},
        coords: [37.2290733, 67.2761489],
    },
    {
        data: {content: 'Urganch'},
        options: {selectOnClick: false},
        coords: [41.5517809, 60.6313161],
    },
];


const YandexMap = ({setCoords, setFullScreen, fullScreen}) => {

    const [lat, setLat] = useState(41.316440);
    const [lng, setLng] = useState(69.294860);
    const [center, setCenter] = useState([41.316440, 69.294860]);

    const onItemClick = coords => {
        setLat(coords[0]);
        setLng(coords[1]);
        setCenter(coords);
        setCoords(coords)
    };

    const clickOnMap = (e) => {
        e.preventDefault();
        const coords = e.get('coords');
        setLat(coords[0]);
        setLng(coords[1]);
        setCoords([coords[0], coords[1]])
    };

    const getHome = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
        } else {
            alert('Geolocation is not supported by this browser!')
        }
    };

    function getCoordinates(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setCenter([position.coords.latitude, position.coords.longitude])
        setCoords([position.coords.latitude, position.coords.longitude])
    }

    return (
        <YMaps>
            <div className="gx-d-inline-block gx-w-100">
                <Map
                    state={{
                        center: center,
                        zoom: 11,
                        controls: [],
                    }}
                    width="100%"
                    onClick={(e) => clickOnMap(e)}
                >
                    <ZoomControl options={{float: 'right'}}/>
                    <FullscreenControl onClick={()=>setFullScreen(!fullScreen)}/>
                    <Placemark geometry={[lat, lng]} options={{
                        iconImageSize: [30, 42],
                        iconImageOffset: [-15, -42]
                    }}/>
                    <GeolocationControl onClick={getHome} options={{float: 'left'}}/>
                    <TypeSelector options={{float: 'right'}}/>
                    <ListBox data={{content: 'Choose city'}} options={{float: 'right'}}>
                        {cities.map(city =>
                            <ListBoxItem
                                data={city.data}
                                options={city.options}
                                onClick={() => onItemClick(city.coords)}
                                key={city.data.content}
                            />
                        )}
                    </ListBox>
                </Map>
            </div>
        </YMaps>
    )
};

export default YandexMap;