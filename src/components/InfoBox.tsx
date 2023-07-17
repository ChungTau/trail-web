import { Box, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { IconType } from "react-icons/lib";

interface InfoBoxProps {
    Icon : IconType;
    unit?: string;
    value : number;
    title : string;
    postfix?: number;
}

const InfoBox = memo(function InfoBox({
    Icon,
    unit,
    value,
    title,
    postfix = 0
} : InfoBoxProps) {
    const theme = useTheme();
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'fit-content'}>
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Icon style={{
                    marginRight: 5
                }}/>
                <Typography variant="body1" fontWeight={600} fontSize={16}>
                    {`${ (value ?? 0).toFixed(postfix)}\u00A0${unit}`}
                </Typography>
            </Box>
            <div
                style={{
                backgroundColor:  theme.palette.primary.main,
                height: 2,
                width: '100%'
            }}/>
            <Typography variant="body1" fontWeight={500} fontSize={14}>
                {title}
            </Typography>
        </Box></Box>
    );
});

export default InfoBox;