import { useTheme } from "@mui/material";
import SmallIcon from "../icons/SmallIcon";
import { useMemo } from 'react';
import { FaStop } from "react-icons/fa6";
import CustomSmallButton, { CustomSmallButtonProps } from "./CustomSmallIconButton";

const ResetButton: React.FC<CustomSmallButtonProps> = ({ onClick }) => {
    const { palette } = useTheme();
    const iconColor = useMemo(() => palette.secondary.main, [palette]);

    return (
        <CustomSmallButton onClick={onClick}>
            <SmallIcon Icon={FaStop} color={iconColor}/>
        </CustomSmallButton>
    );
};

export default ResetButton;
