import {Feature, Point, Properties} from "@turf/helpers";
import {Layer, Source} from "react-map-gl";

function EndPoint({point} : {point:Feature<Point, Properties>}) {
    return (
        <Source id="endpoint" type="geojson" data={point}>
            <Layer
                id="end2"
                type="circle"
                source="endpoint"
                paint={{
                'circle-radius': 8,
                'circle-color': '#ffffff'
            }}/>
            <Layer
                id="end"
                type="circle"
                source="endpoint"
                paint={{
                'circle-radius': 5,
                'circle-color': 'red'
            }}/>
        </Source>
    );
}

export default EndPoint;