import {Feature, LineString, Properties, point} from "@turf/helpers";
import {Track} from "gpxparser";
import {memo} from "react";
import bbox from '@turf/bbox';
import Map, {Layer, MapRef, Source} from 'react-map-gl';

import {styled} from "@mui/material";
import Route from "./Route";
import StartPoint from "./StartPoint";
import EndPoint from "./EndPoint";
interface ThumbnailMapProps {
    mapRef : React.MutableRefObject < MapRef | null >;
    route : Feature < LineString,
    Properties >;
    gpx : Track;
}

const BaseContainer = styled('div')({
    gridArea: '1 / 2 / 4 / 3',
    height: '100%',
    '@media (max-width: 960px)': {
        gridArea: '2 / 1 / 3 / 3',
        height: '350px',
    }
});

const ThumbnailMap = memo(({mapRef, route, gpx} : ThumbnailMapProps) => {
    function onLoad() {
        const [minLng,
            minLat,
            maxLng,
            maxLat] = bbox(route);
        mapRef
            ?.current
                ?.fitBounds([
                    [
                        minLng, minLat
                    ],
                    [maxLng, maxLat]
                ], {
                    padding: 40,
                    duration: 1000
                });
    }
    return (
        <BaseContainer>
            <Map
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                style={{
                width: '100%',
                height: '100%',
                borderRadius: 12
            }}
                dragPan={false}
                dragRotate={false}
                scrollZoom={false}
                onLoad={onLoad}
                mapStyle="mapbox://styles/mapbox/streets-v9">
                <Route route={route}/>
                <StartPoint point={point([gpx.points[0].lon, gpx.points[0].lat])}/>
                <EndPoint
                    point={point([
                    gpx.points[gpx.points.length - 1].lon,
                    gpx.points[gpx.points.length - 1].lat
                ])}/>
            </Map>
        </BaseContainer>
    );
});

export default ThumbnailMap;
