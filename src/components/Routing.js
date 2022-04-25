import L from "leaflet";
import moment from 'moment';
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { setDistance, setTime } from '../store/searchSlice'
import { useDispatch } from 'react-redux';

const Routing = ({ pointA, pointB }) => {

    const dispatch = useDispatch()

    const createLayer = () => {
        const instance = L.Routing.control({
            waypoints: [
                L.latLng(pointA.position.lat, pointA.position.lng),
                L.latLng(pointB.position.lat, pointB.position.lng)
            ],
            lineOptions: {
                styles: [{ color: "#965de9", weight: 4 }]
            },
        });

        instance.on('routesfound', (e) => {
            let routes = e.routes;
            let summary = routes[0].summary;
            let totalTime = moment.utc(1000 * summary.totalTime).format("H[h] mm[m]")
            console.log('total time: ', totalTime);
            let totalDistance = Math.floor(summary.totalDistance / 1000)
            dispatch(setTime(totalTime))
            dispatch(setDistance(totalDistance))
        });

        return instance;
    };

    const RoutingMachine = createControlComponent(createLayer);

    return <RoutingMachine />

};

export default Routing;
