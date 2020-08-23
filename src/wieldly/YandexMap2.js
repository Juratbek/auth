import React from "react";
import { Circle, YMaps } from 'react-yandex-maps'

const CircleWithEvents = ({onGeometryChange}) => (
    <YMaps>
        <Circle
            geometry={{
                coordinates: [55.76, 37.64],
                radius: 10000
            }}
            onGeometryChange={onGeometryChange}
        />
    </YMaps>
);

export default CircleWithEvents