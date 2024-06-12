import 'leaflet/dist/leaflet.css';
import React,{useState} from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import './map.css';
import {features} from '../data/countries.json';


const Map = ()=>{
    const mapStyle = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }
    return(
         <div className='container'>
            <div className="">
                <div className="">
                <MapContainer center={[20, 0]}
                zoom={2} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                </div>
            </div>
        </div>

    )
}
export default Map;