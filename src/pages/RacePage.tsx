import {Fab, styled, useTheme} from "@mui/material";
import {Variants, motion} from "framer-motion";
import {useParams} from 'react-router-dom';
import {DarkModeSwitch} from "react-toggle-dark-mode";
import {dark} from "../utils/constants/palette";
import {useContext, useEffect, useState} from "react";
import {ColorModeContext} from "../contexts/ColorModeContext";
import MapBanner from "../components/MapBanner";
import GpxParser, {Point, Track} from "gpxparser";
import {Feature, LineString, Properties, lineString} from "@turf/helpers";
import LinearGradientContainer from "../components/LinearGradientContainer";
import CheckPoints from "../components/Checkpoints";

const FloatButton = styled(Fab)(({theme}) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: theme.palette.iconButton.main,
    '&:hover': {
        backgroundColor: theme.palette.iconButton.light
    }
}));
const pageTransition : Variants = {
    initial: {
        opacity: 0,
        x: "-100vw",
        scale: 0.8
    }, in: {
        opacity: 1,
        x: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        x: "100vw",
        scale: 1.2
    }
};

function RacePage() {
    const {raceName} = useParams();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [gpxData, setGpxData] = useState<Track | null>(null);
    const [route, setRoute] = useState<Feature<LineString, Properties> | null>(null);

    useEffect(() => {
        // 'myFile.gpx' should be replaced by your file's name
        const fetchAndParseGpx = async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/gpxs/${raceName}.gpx`);
            const text = await response.text();
            const parser = new GpxParser();
            parser.parse(text);
            const data = parser.tracks[0];
            setGpxData(data);
            setRoute(convertToRoute(data));
        }
        fetchAndParseGpx();
    }, [raceName]);

    function convertToRoute(gpx : Track) {
        let points = gpx.points.map((point: Point) => [point.lon, point.lat]);
        const route = lineString(points);
        return route;
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageTransition}
            transition={{
            duration: 0.5
        }}>
            <motion.div
                style={{
                backgroundColor: theme.palette.secondary.main,
                overflowX: 'hidden',
                width: '100vw',
                height: '100vh'
            }}
                animate={{
                backgroundColor: theme.palette.secondary.main
            }}
                transition={{
                duration: 0.1,
       
            }}>
                <main>
                    <MapBanner route={route} gpxData={gpxData}/>
                    <CheckPoints/>
                    <FloatButton onClick={colorMode.toggleColorMode}>
                        <DarkModeSwitch
                            checked={theme.palette.mode === dark}
                            sunColor='#f8f8f8'
                            onChange={() => {}}
                            size={20}/>
                    </FloatButton>
                </main>
            </motion.div>

        </motion.div>
    );
}

export default RacePage;
