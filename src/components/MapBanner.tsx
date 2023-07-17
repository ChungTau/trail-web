import {
    Box,
    Slider,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import {
    Feature,
    LineString,
    Position,
    Properties,
    Units,
    lineString,
    point
} from "@turf/helpers";
import bbox from '@turf/bbox';
import Route from "./Route";
import StartPoint from "./StartPoint";
import EndPoint from "./EndPoint";
import {
    Layer,
    Map,
    MapRef,
    SkyLayer,
    Source
} from "react-map-gl";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {along, distance, length} from '@turf/turf';

import {Track} from "gpxparser";
import CustomFullscreenControl from "./buttons/CustomFullScreenControl";
import MapPanelBase from "./MapPanelBase";
import PlayPauseButton from "./buttons/PlayPauseButton";
import ResetButton from "./buttons/ResetButton";
import { RiPinDistanceFill } from "react-icons/ri";
import LinearGradientContainer from "./LinearGradientContainer";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TimeInput from "./TimeInput";

const hongKongCoordinates : [number, number] = [114.1240828577849, 22.411051302307296];
const terrainRate = 1.25;
const skyLayer : SkyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [
            0.0, 0.0
        ],
        'sky-atmosphere-sun-intensity': 15
    }
};

interface MapBannerProps {
    route : Feature < LineString,
    Properties >| null;
    gpxData : Track | null;
}

function lerp(start : number, end : number, t : number) : number {
    return start * (1 - t) + end * t;
}

const MapContainer = styled('div')({width: '100vw', height: '800px'});

function MapBanner({route, gpxData} : MapBannerProps) {
    const start = useRef(0);
    const animationFrameId = useRef < number | null > (null);
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [isFullScreen, setIsFullScreen] = useState(false); // Add this line to create a state variable
    const lastPositionRef = useRef<Position|null>(null);
    const [sliderValue,
        setSliderValue] = useState < number > (0.75);
    const [currentDistance,
        setCurrentDistance] = useState(0);
    const [isPlaying,
        setIsPlaying] = useState(false);
    const isPlayingRef = useRef(isPlaying);
    const mapRef = useRef < MapRef | null > (null);
    const [currentPosition,
        setCurrentPosition] = useState < Position > ();
    const [progressLine,
        setProgressLine] = useState(route
        ?.geometry.coordinates.slice(0, 1) || []);

    const startTime = useRef(0);
    const elapsedTime = useRef(0);
    const bearingRef = useRef(0);
    const zoomRef = useRef(0);

    const onLoad = useCallback(() => {
        handleResize();
        if (route) {
            setCurrentPosition(route.geometry.coordinates[0]);
        }
    }, [route]);

    const handleSliderChange = useCallback((event: Event, value: number | number[], activeThumb: number): void => {
        if (typeof value === 'number') {
          setSliderValue(value);
        }
      },[]);

    const handleResize = useCallback(() => {
        if (route) {
            if (startTime.current === 0 && elapsedTime.current === 0) {
                const [minLng, minLat, maxLng, maxLat] = bbox(route);
                mapRef.current
                    ?.fitBounds([
                        [
                            minLng, minLat
                        ],
                        [maxLng, maxLat]
                    ], {
                        padding: {
                            top: 40,
                            bottom: 240,
                            left: 40,
                            right: 40
                        },
                        duration: 1000
                    },
                );
            }
        }
    },[route]);

    

    const routeComponents = useMemo(() => {
        if (route) {
            const startPoint = point(route.geometry.coordinates[0]);
            const endPoint = point(route.geometry.coordinates[route.geometry.coordinates.length - 1]);
            return (
                <> 
                    <StartPoint point={startPoint}/>
                    <EndPoint point={endPoint}/> 
                </>
            )
        }
        return null;
    }, [route]);

    const animateFlyAlongRoute = useCallback((time : number) => {
        if (!isPlayingRef.current) {
            elapsedTime.current += time - startTime.current;
            return;
        }

        if (!startTime.current) {
            startTime.current = time;
        }

        if (route && currentPosition) {
            const distance2 = length(route);
            const totalElapsed = elapsedTime.current + time - startTime.current;
            const animationPhase = (totalElapsed - start.current) / (distance2 * 1000) * (sliderValue);

            if (animationPhase > 1) {
                handleReset();
                return;
            }

            const alongPath = along(route, distance2 * animationPhase).geometry.coordinates;
            setCurrentPosition(alongPath);
            if(lastPositionRef.current){
                const lastPositionPoint = point(lastPositionRef.current);
                const currentPositionPoint = point(alongPath);
                const options = { units: "kilometers" as Units};
                const distanceTravelled = distance(lastPositionPoint, currentPositionPoint, options);
                setCurrentDistance(prevDistance => prevDistance + distanceTravelled);
            }
    
            lastPositionRef.current = alongPath;
            const bearing = 0 + animationPhase * 300.0;
            bearingRef.current = bearing;
            if (mapRef.current) {
                const currentView = mapRef
                    .current
                    .getCenter();
                const interpolatedView = [
                    lerp(currentView.lng, alongPath[0], 0.1),
                    lerp(currentView.lat, alongPath[1], 0.1)
                ];

                let currentElevation = mapRef
                    .current
                    .queryTerrainElevation(currentView);

                let targetElevation = mapRef
                    .current
                    .queryTerrainElevation([interpolatedView[0], interpolatedView[1]]);

                let currentZoomLevel = 15 - (((currentElevation ?? 1)) / 13) * 0.01;
                let targetZoomLevel = 15 - (((targetElevation ?? 1)) / 13) * 0.01;

                let zoomLevel = lerp(currentZoomLevel, targetZoomLevel, 0.05);
                zoomRef.current = zoomLevel;
                mapRef
                    .current
                    .easeTo({
                        center: [
                            interpolatedView[0], interpolatedView[1]
                        ],
                        pitch: 48,
                        bearing: bearing,
                        zoom: zoomLevel,
                        duration: 0,
                    });
                animationFrameId.current = window.requestAnimationFrame(animateFlyAlongRoute);
            }
        }
    },[route, currentPosition, sliderValue]);

    const handlePlayPause = () => {
        console.log(sliderValue);
        setIsPlaying(prevState => {
            const newValue = !prevState;
            if (newValue) {
                startTime.current = 0;
                flyToRoute();
            }
            return newValue;
        });
    };

    const handleReset = useCallback(() => {
        if (animationFrameId.current) {
            window.cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null; // reset the animation frame id
        }
        setCurrentDistance(0);
        setIsPlaying(false);
        lastPositionRef.current = null;
        isPlayingRef.current = false;
        startTime.current = 0;
        start.current = 0;
        elapsedTime.current = 0;
        bearingRef.current = 0;
        zoomRef.current = 0;
        if (route) {
            setCurrentPosition(route.geometry.coordinates[0]);
            setProgressLine(route.geometry.coordinates.slice(0, 1) || []);
            handleResize();
            return;
        }
    },[route]);

    const flyToRoute = useCallback(() => {
        if (mapRef.current && currentPosition) {
            const currentElevation = mapRef
                .current
                .queryTerrainElevation([currentPosition[0], currentPosition[1]]);
            let currentZoomLevel = 15 - (((currentElevation ?? terrainRate) / terrainRate) / 13) * 0.01;
            mapRef
                .current
                .flyTo({
                    center: [
                        currentPosition[0], currentPosition[1]
                    ],
                    pitch: 48,
                    bearing: bearingRef.current,
                    duration: 2000,
                    zoom: (startTime.current === 0)
                        ? currentZoomLevel
                        : zoomRef.current
                });
            setTimeout(() => {
                animationFrameId.current = window.requestAnimationFrame(animateFlyAlongRoute);

            }, 2400);
        }
    },[currentPosition,sliderValue]);

    const handleFullScreenChange = useCallback(() => {
        setIsFullScreen(document.fullscreenElement !== null); // Updates the fullscreen state
        handleResize();
    }, [handleResize]);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [route]);

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullScreenChange); // Updates the event listener
        return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
    }, [handleFullScreenChange]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        if (currentPosition) {
            setProgressLine((line) => [
                ...line,
                currentPosition
            ]);
        }
    }, [currentPosition]);

    return (
        <MapContainer>
            <Map
                ref={mapRef}
                initialViewState={{
                longitude: hongKongCoordinates[0],
                latitude: hongKongCoordinates[1]
            }}
                maxBounds={[
                [
                    113.525, 21.9535
                ],
                [114.705, 22.8619]
            ]}
                maxZoom={18}
                minZoom={10}
                terrain={{
                source: 'mapbox-dem',
                exaggeration: terrainRate
            }}
                onLoad={onLoad}
                optimizeForTerrain
                mapStyle={"mapbox://styles/mapbox/satellite-v9"}
                mapboxAccessToken={process.env.REACT_APP_MapboxAccessTokenDev}>
                  {routeComponents}  

                {route && ((progressLine.length > 1)
                    ? (<Route
                        route={(startTime.current == 0 && elapsedTime.current == 0)
                        ? route
                        : lineString(progressLine)}/>)
                    : <Route route={route}/>)}

                <Source
                    id="mapbox-dem"
                    type="raster-dem"
                    url="mapbox://mapbox.mapbox-terrain-dem-v1"
                    tileSize={512}
                    maxzoom={14}/>

                <Layer {...skyLayer}/>
                <MapPanelBase top={30} right={20}>
                    <PlayPauseButton onClick={handlePlayPause} isPlaying={isPlaying}/>
                    <ResetButton onClick={handleReset}/>
                    {mapRef &&<CustomFullscreenControl mapRef={mapRef}/>}
                    <Slider sx={{
                        width: 160,
                        mx:1.5
                    }} valueLabelFormat={(v,i)=>(`${v}x`)} disabled={(startTime.current !== 0 || elapsedTime.current !== 0)} orientation="horizontal" marks max={2} defaultValue={0.75} value={sliderValue} // Update this line
                        onChange={handleSliderChange} step={0.25} min={0.5} size="small" valueLabelDisplay="on"/>
                </MapPanelBase>
                
                <div style={{position: 'absolute', bottom:200, width:'100%', height:50, zIndex:999, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <Box sx={{backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', borderRadius:2, px:2, py:0.5, textAlign:'center', alignItems:'center', display: 'flex', justifyContent: 'center',flexDirection:'column'}}>
                    {gpxData&&
                        <Box sx={{display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems:'center', gap:1.2}}>
                            <RiPinDistanceFill fontSize={16}/>
                            <Typography sx={{
                            fontFamily: 'Teko', fontWeight: '500', fontSize:20, letterSpacing:2, color: 'white'
                        }}>
                            {
                                (!(startTime.current === 0 && elapsedTime.current === 0)) ?(currentDistance.toFixed(1)+" KM"):((gpxData?.distance.total/1000).toFixed(1)+" KM")
                            }
                        </Typography>
                            </Box>
 
                    }
                    </Box>
                </div>
                {!isFullScreen && <LinearGradientContainer gpxData={gpxData}/>} {/* Updates this line to conditionally render LinearGradientContainer */}
            </Map>
        </MapContainer>
    );
}

export default MapBanner;
