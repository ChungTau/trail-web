import { Feature, LineString, Properties } from "@turf/helpers";
import { Layer, Source } from "react-map-gl";

function Route({route}:{route:Feature<LineString, Properties>}){
    return(
        <Source type="geojson" data={route}>
                <Layer
                    type="line"
                    paint={{
                        
                        "line-color": "#ff5b3b",
                        "line-opacity": 0.3,
                        "line-width": 5,
                    }}
                    layout={{
                    "line-join": "round",
                    "line-cap": "round",
                    
                }}/>
                <Layer
                    type="line"
               
                    paint={{
                        
                        "line-color": "#ff5b3b",
                        "line-width": 5,
                        'line-dasharray': [0, 4, 3],
                     
                    }}
                    layout={{
                    "line-join": "round",
                    "line-cap": "round",
                    
                }}/>
            </Source>
    );
}

export default Route;