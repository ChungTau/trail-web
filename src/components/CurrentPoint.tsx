import { Feature, Point, Properties } from "@turf/helpers";
import { Layer, Source } from "react-map-gl";

function CurrentPoint({point}:{point:Feature<Point,Properties>}){
    return(
        <Source id='point' type='geojson' data={point}>
          <Layer id='point' type='circle' paint={{'circle-color':"#303030", "circle-radius":8, "circle-stroke-color": "#EEEEEE", "circle-stroke-width":5, "circle-stroke-opacity":0.75}}/>
        </Source>
    );
}

export default CurrentPoint;