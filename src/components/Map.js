import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import "leaflet-routing-machine";
import { CostInfo } from "./CostInfo";
import { setRecentRoutes } from '../store/routesSlice'
import { ExportPDF } from './ExportPDF'
import Routing from "./Routing";

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
                <Routing pointA={pointA} pointB={pointB} />
            </MapContainer>
        </>
    )
}

export default Map