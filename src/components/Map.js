import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import "leaflet-routing-machine";
import { CostInfo } from "./CostInfo";
import { setDistance } from '../store/searchSlice'
import { setRecentRoutes } from '../store/routesSlice'

const Map = () => {

    const dispatch = useDispatch()

    const { pointA, pointB } = useSelector((state) => state.search)
    const { recentRoutes } = useSelector((state) => state.routes)

    useEffect(() => {
        dispatch(setRecentRoutes({ pointA, pointB }))
    }, [])

    console.log("Recent: ", recentRoutes);

    const createLayer = () => {
        const instance = L.Routing.control({
            waypoints: [
                L.latLng(pointA.position.lat, pointA.position.lng),
                L.latLng(pointB.position.lat, pointB.position.lng)
            ],
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 5 }]
            },
        });
        instance.on('routesfound', function (e) {
            let routes = e.routes;
            let summary = routes[0].summary;
            let totalDistance = Math.floor(summary.totalDistance / 1000)
            dispatch(setDistance(totalDistance))
        });
        return instance;
    };

    const RoutingMachine = createControlComponent(createLayer);

    return (
        <>
            <Link to='/' className='back'>Wróć</Link>
            <CostInfo />
            <MapContainer zoom={5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoutingMachine />
            </MapContainer>
        </>
    )
}

export default Map