import { useTheme } from "@mui/material";
import SmallIcon from "../icons/SmallIcon";
import { PiAirplaneTiltFill, PiPauseFill } from "react-icons/pi";
import { useMemo } from 'react';
import CustomSmallButton, { CustomSmallButtonProps } from "./CustomSmallIconButton";

interface PlayPauseButtonProps extends CustomSmallButtonProps {
    isPlaying: boolean;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ onClick, isPlaying }) => {
    const { palette } = useTheme();
    const iconColor = useMemo(() => palette.secondary.main, [palette]);

    return (
        <CustomSmallButton onClick={onClick}>
            {isPlaying
                ? <SmallIcon Icon={PiPauseFill} color={iconColor}/>
                : <SmallIcon Icon={PiAirplaneTiltFill} color={iconColor}/>}
        </CustomSmallButton>
    );
};

export default PlayPauseButton;
