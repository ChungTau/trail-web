import {Variants, motion, useAnimation, useInView} from "framer-motion";
import {Wrapper} from "./Wrapper";
import {useEffect, useRef, useState} from "react";
import {Box, styled, useTheme} from "@mui/material";
import CheckPoint, {RACEPOINTS} from "./CheckPoint";
import dayjs, { Dayjs } from 'dayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Swiper from 'react-id-swiper';
import 'swiper/css';
import {routeInfos} from "../utils/constants/info";
import {useParams} from "react-router-dom";
import theme from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const params = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
}

const CheckPoints = () => {
    const {raceName} = useParams();
    const theme = useTheme();

    return (
        <Wrapper style={{
            paddingTop: 0
        }}>
            <motion.div
                style={{
                pointerEvents: 'none',
                position: 'absolute',
                top:0,
                left:0,
                width: '100%',
                height: '100%',
                zIndex:99,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main} 4%, transparent 10%, transparent 90%, ${theme.palette.secondary.main} 96%)`
            }}animate={{
                background: `linear-gradient(90deg, ${theme.palette.secondary.main} 4%, transparent 10%, transparent 90%, ${theme.palette.secondary.main} 96%)`
            }}
                transition={{
                duration: 0.1
            }}/>
            <Swiper {...params}>
                {(raceName && (raceName in routeInfos))
                    ? routeInfos[`${raceName}`].racePoints.map((point, index) => <div><CheckPoint key={index} {...point}/></div>)
                    : <div/>}
            </Swiper>
        </Wrapper>
        

    );
};

export default CheckPoints;