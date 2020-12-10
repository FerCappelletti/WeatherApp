import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkLocation from "./MarkLocation";
import L from "leaflet";
import { getData } from "../repository/RepositoryCities";

const Mapa = () => {
    const [state, setState] = useState({
        position: { lat: "", lng: "" },
        name: "",
        main: { pressure: "", humidity: "", temp_max: "", temp_min: "" },
    });

    const Icon = L.icon({
        iconUrl: require("../assets/icon.svg"),
        iconRetinaUrl: require("../assets/icon.svg"),
        iconAnchor: null,
        shadowAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        iconSize: [35, 35],
        className: "Leaflet-veneu-icon",
    });

    useEffect(() => {
        getCity();
    }, []);

    const getCity = async () => {
        const res = await getData();
        const L = [JSON.parse(res.data.coord.lat), JSON.parse(res.data.coord.lon)];

        setState({
            position: { lat: res.data.coord.lat, lng: res.data.coord.lon },
            name: res.data.name,
            main: {
                pressure: res.data.main.pressure,
                humidity: res.data.main.humidity,
                temp_max: res.data.main.temp_max,
                temp_min: res.data.main.temp_min,
            },
        });
    };
    console.log(state.name);

    return (
        <div className="container">
            <MapContainer center={state.position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkLocation position={state.position} name={state.name} icon={Icon}></MarkLocation>
            </MapContainer>

            <table className="table">
                <thead>
                    <tr>
                        <th>Presión</th>
                        <th>Humedad</th>
                        <th>Temperatura máxima</th>
                        <th>Temperatura mínima</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {state.main.pressure} {"hPa"}
                        </td>
                        <td>
                            {state.main.humidity} {"%"}
                        </td>
                        <td>
                            {state.main.temp_max} {"°"}
                        </td>
                        <td>
                            {state.main.temp_min} {"°"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Mapa;
