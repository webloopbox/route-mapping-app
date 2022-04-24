import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import L from "leaflet";
import moment from 'moment';
import { createControlComponent } from "@react-leaflet/core";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import "leaflet-routing-machine";
import { CostInfo } from "./CostInfo";
import { setDistance, setTime } from '../store/searchSlice'
import { setRecentRoutes } from '../store/routesSlice'
import { ExportPDF } from './ExportPDF'

const Map = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { pointA, pointB, mapActive } = useSelector((state) => state.search)

    useEffect(() => {
        if (mapActive == true) {
            dispatch(setRecentRoutes({ pointA, pointB }))
        } else {
            navigate('/')
        }
    }, [])

    if (mapActive == false) {
        return null;
    }

    const createLayer = () => {
        const instance = L.Routing.control({
            waypoints: [
                L.latLng(pointA.position.lat, pointA.position.lng),
                L.latLng(pointB.position.lat, pointB.position.lng)
            ],
            lineOptions: {
                styles: [{ color: "#965de9", weight: 5 }]
            },
        });

        instance.on('routesfound', (e) => {
            let routes = e.routes;
            let summary = routes[0].summary;
            let totalTime = moment.utc(1000 * summary.totalDistance).format("H[h] mm[m]")
            console.log('total time: ', totalTime);
            let totalDistance = Math.floor(summary.totalDistance / 1000)
            dispatch(setTime(totalTime))
            dispatch(setDistance(totalDistance))
        });

        return instance;
    };

    const RoutingMachine = createControlComponent(createLayer);

    return (
        <>
            <Link to='/' className='back'>Wróć</Link>
            <CostInfo />
            <ExportPDF />
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