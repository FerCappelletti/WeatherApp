import React from "react";
import { Marker, Popup } from "react-leaflet";

const MarkLocation = ({ position, icon, name }) => {
    return (
        <Marker position={position} icon={icon}>
            <Popup>{name}</Popup>
        </Marker>
    );
};

export default MarkLocation;
