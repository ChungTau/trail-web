import {Card, CardContent, Typography, Grid, Box, useTheme} from '@mui/material';
import { useEffect, useState } from 'react';
import { FaBed, FaBowlFood, FaBus, FaPersonRunning} from 'react-icons/fa6';
import {GrRun} from 'react-icons/gr';
import {MdLocalDrink} from 'react-icons/md';
import {IconBaseProps, IconType} from "react-icons/lib";
import {IoFastFoodSharp} from 'react-icons/io5';
import { BiMaleFemale, BiSolidFirstAid } from 'react-icons/bi';
import SmallIcon from './icons/SmallIcon';
import { RiPinDistanceFill } from 'react-icons/ri';
import {RxLapTimer} from 'react-icons/rx';

export enum RACEPOINTS {
    Start = "Start",
    Finish = "Finish",
    Checkpoint = "Checkpoint",
    AidStation = "Aid Station",
    DropBag = "Drop Bag"
};

export enum RACESERVICESTYPE{
    FOODS = "Foods",
    DRINKS = "Drinks",
    FOODNDRINKS = "Foods and Drinks",
    WC = "WC",
    ORGANISATIONBUS = "Organisation Bus",
    RESTAREA = "Rest Area",
    EMERGENCY = "Emergency"
};


const SERVICE_ICONS: Record<RACESERVICESTYPE, IconType> = {
    [RACESERVICESTYPE.FOODS]: FaBowlFood,
    [RACESERVICESTYPE.DRINKS]: MdLocalDrink,
    [RACESERVICESTYPE.FOODNDRINKS]: IoFastFoodSharp,
    [RACESERVICESTYPE.WC]: BiMaleFemale,
    [RACESERVICESTYPE.ORGANISATIONBUS]: FaBus,
    [RACESERVICESTYPE.RESTAREA]: FaBed,
    [RACESERVICESTYPE.EMERGENCY]: BiSolidFirstAid
};


export interface PointProps {
    order?: number;
    url: string;
    placeName : string;
    type : RACEPOINTS;
    distance : number;
    elevation : number;
    services : RACESERVICESTYPE[];
    cutOffTime? : string;

}

const CheckPoint = ({
    order,
    type,
    url,
    placeName,
    distance,
    elevation,
    services,
    cutOffTime
} : PointProps) => {
 
    const theme = useTheme();
    return (
        <Card sx={{
            width: '100%',
            borderRadius:4,

        }}>
            <CardContent
                sx={{
                    p:3,
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gridTemplateRows: '40px, repeat(2,1fr)',
                    gridColumnGap: 30
            }}>

                    <img src={url} alt={placeName} style={{ gridArea: '1 / 1 / 4 / 2',width:320, borderRadius:8, aspectRatio:'16/9'}}/>

                <Box sx={{borderRadius:2,gridArea: '1 / 2 / 2 / 3' }}>
                    <Typography variant="h5" component="div" fontFamily={"GenSekiGothic"}>
                        {`${type}` + ` ${order??''}` +` - ${placeName}`}
                    </Typography>
                </Box>
                <Box sx={{gridArea: '2 / 2 / 3 / 3' ,display:'flex', flexDirection: 'row', alignItems: 'end', gap:2}}>
                {
                        services.map(service => {
                            const ServiceIcon = SERVICE_ICONS[service];
                            return (
                                <Box key={service} sx={{bgcolor:theme.palette.iconButton.main, borderRadius:16, width:50, height:50, alignItems:'center', display:'flex', justifyContent:'center'}} >
                                    <ServiceIcon aria-label={service} fontSize={28} style={{color:'white'}}/>
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box sx={{gridArea: '3 / 2 / 4 / 3' ,display:'flex', flexDirection: 'row', alignItems: 'end', gap:2}}>
                   
                     <Box sx={{backgroundColor: theme.palette.secondary.main, p:1.5, borderRadius:2, display:'flex', flexDirection: 'row' ,gap:2, justifyContent:'center', alignItems:'center'}}>
                            <SmallIcon Icon={RiPinDistanceFill} color={theme.palette.info.main}/>
                            <Typography fontWeight={600}>
                                {`${distance} KM`}
                            </Typography>
                        </Box>
                        <Box sx={{backgroundColor: theme.palette.secondary.main, p:1.5, borderRadius:2, display:'flex', flexDirection: 'row' ,gap:2, justifyContent:'center', alignItems:'center'}}>
                            <SmallIcon Icon={FaPersonRunning} color={theme.palette.info.main}/>
                            <Typography fontWeight={600}>
                                {`${elevation} EP`}
                            </Typography>
                        </Box>
                        {cutOffTime && <Box sx={{backgroundColor: theme.palette.secondary.main, p:1.5, borderRadius:2, display:'flex', flexDirection: 'row' ,gap:2, justifyContent:'center', alignItems:'center'}}>
                            <SmallIcon Icon={RxLapTimer} color={theme.palette.info.main}/>
                            <Typography fontWeight={600}>
                                {cutOffTime}
                            </Typography>
                        </Box>}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CheckPoint;
