import { useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapRef } from "react-map-gl";
import {BiFullscreen, BiExitFullscreen} from "react-icons/bi"
import SmallIcon from "../icons/SmallIcon";
import CustomSmallButton from "./CustomSmallIconButton";

interface CustomFullscreenControlProps {
    mapRef: React.MutableRefObject<MapRef|null>;
}

const CustomFullscreenControl = ({mapRef}: CustomFullscreenControlProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { palette } = useTheme();
    const iconColor = useMemo(() => palette.secondary.main, [palette]);

    const handleClick = useCallback(() => {
        if(!mapRef.current) return;
        const mapNode = mapRef.current.getMap().getContainer();
        if (!isFullscreen) {
            if (mapNode.requestFullscreen) {
                mapNode.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, [mapRef, isFullscreen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <CustomSmallButton onClick={handleClick}>
            {isFullscreen ? <SmallIcon Icon={BiExitFullscreen} color={iconColor}/> : <SmallIcon Icon={BiFullscreen} color={iconColor}/>}
        </CustomSmallButton>
    );
};

export default CustomFullscreenControl;
