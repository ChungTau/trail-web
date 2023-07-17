import {Box, useColorScheme, useTheme} from "@mui/material";
import {ReactNode} from "react";

interface MapPanelBaseProps {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
    children : ReactNode;
}

const MapPanelBase = ({top, right, left, bottom, children} : MapPanelBaseProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
            position: 'absolute',
            top: top,
            height: 60,
            right: right,
            bottom: bottom,
            left: left,
            backgroundColor: theme.palette.secondary.dark,
            backdropFilter: 'blur(8px)',
            px: 3,
            py: 1.5,
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 8,
            justifyContents: 'space-evenly',
            alignItems: 'center',
            gap: 1.6
        }}>
            {children}
        </Box>
    );
};

export default MapPanelBase;