import {
    Box,
    Card,
    Typography,
    styled,
    useTheme,
} from "@mui/material";
import {Point, Track} from "gpxparser";

import {GiPathDistance} from 'react-icons/gi';
import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi';
import {FaMountain, FaMountainCity, FaPersonRunning} from 'react-icons/fa6';
import {MapRef} from 'react-map-gl';
import {
    lineString,
} from '@turf/helpers';
import {useRef} from "react";
import InfoBox from "./InfoBox";
import ThumbnailMap from "./ThumbnailMap";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
interface RaceProps {
    gpx : Track
}

const TitleContainer = styled(Typography)({
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow:'hidden',
    gridArea: '1 / 1 / 2 / 2',
    fontSize: '24px',
    fontFamily:"GenSekiGothic",
    '@media (max-width: 960px)':{
        gridArea: '1 / 1 / 2 / 3',
    },
    '@media (max-width: 600px)':{
        gridArea: '1 / 1 / 2 / 3',
        fontSize: '18px'
    }
});

const InfoBoxContainer = styled(Box)({
    gridArea: '2 / 1 / 4 / 2',
    '@media (max-width: 960px)':{
        gridArea: '3 / 1 / 4 / 3',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const InfoBoxInnerContainer = styled(Box)({
    display: 'grid',
    gap: '0.4rem',
    gridTemplateColumns:'100px 100px 100px',
    marginTop: 30,
    '@media (max-width: 960px)':{
        display: 'grid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        gridRowGap:12,
        gridColumnGap:1,
        gridTemplateColumns:'repeat(3,1fr)',
        
    }
});


function Race({gpx} : RaceProps) {
    const theme = useTheme();
    let mapRef = useRef < MapRef | null > (null);
    const CardContainer = styled(motion(Card))({
        margin: '10px 0 10px 0',
        padding: 24,
        borderRadius: 12,
        minHeight: 160,
        maxHeight: 600,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gridColumnGap: '16px',
        backgroundColor: theme.palette.secondary.main,
        '@media (max-width: 960px)':{
            gridTemplateRows: '50px repeat(3, 1fr)',
            padding: 22,
            margin: 14
        },
        '@media (max-width: 600px)':{
            padding: 18,
            margin: 12
        },
    });
    function convertToRoute(gpx : Track) {
        let points = gpx
            .points
            .map((point : Point) => [point.lon, point.lat]);
        const route = lineString(points);
        return route;
    }
    const route = convertToRoute(gpx);

    const renderTitle = () => {
        return (
            <TitleContainer>
                    {gpx.name}
                
            </TitleContainer>
        );
    }
    const renderInfoBoxs = () => {
        return (
            <InfoBoxContainer>
                <InfoBoxInnerContainer
                    >
                    <InfoBox
                        Icon={GiPathDistance}
                        value={gpx.distance.total * 0.001}
                        unit="km"
                        title="Distance"/>
                    <InfoBox
                        Icon={FiArrowUpRight}
                        value={gpx.elevation.pos}
                        unit="m"
                        title="Uphill"/>
                    <InfoBox
                        Icon={FiArrowDownRight}
                        value={gpx.elevation.neg}
                        unit="m"
                        title="Downhill"/>
                    <InfoBox
                        Icon={FaMountainCity}
                        value={gpx.elevation.min}
                        unit="m"
                        title="Low Point"/>
                    <InfoBox
                        Icon={FaMountain}
                        value={gpx.elevation.max}
                        unit="m"
                        title="High Point"/>
                    <InfoBox
                        Icon={FaPersonRunning}
                        value={(gpx.distance.total * 0.001 + gpx.elevation.pos * 0.01)}
                        unit="EP"
                        title="Efforts Point"/>
                </InfoBoxInnerContainer>
            </InfoBoxContainer>
        );
    }

    return (
        <CardContainer>
            <Reveal>
                {renderTitle()}
            </Reveal>
            <ThumbnailMap mapRef={mapRef} gpx={gpx} route={route}/>
            {renderInfoBoxs()}
        </CardContainer>
    );
}

export default Race;