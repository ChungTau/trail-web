import {Feature, Point, Properties} from "@turf/helpers";
import {Layer, Source} from "react-map-gl";

function StartPoint({point} : {point:Feature<Point, Properties>}) {
    return (
        <Source id="startPoint" type="geojson" data={point}>
            <Layer
                id="origin2"
                type="circle"
                source="startPoint"
                paint={{
                'circle-radius': 8,
                'circle-color': '#ffffff'
            }}/>
            <Layer
                id="origin"
                type="circle"
                source="startPoint"
                paint={{
                'circle-radius': 5,
                'circle-color': 'lime'
            }}/>
        </Source>
    );
}

export default StartPoint;