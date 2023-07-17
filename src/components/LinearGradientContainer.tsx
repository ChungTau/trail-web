import {Box, Typography, styled, useMediaQuery, useTheme} from "@mui/material";
import {motion} from "framer-motion";
import {Track} from "gpxparser";
import {Reveal} from "./Reveal";
import {Wrapper} from "./Wrapper";
import TimeInput from "./TimeInput";
const MotionTypography = motion(Typography);

const TimeContainer = styled(motion.div)({
    position: 'absolute',
    bottom:85,
    right:40,
    display: 'flex',
    justifyContent: 'center', 
    alignItems:'center',
    PointerEvent: 'fill',
});

const LinearGradientContainer = ({gpxData} : {
    gpxData: Track | null
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    let fontSize;

    if (isSmallScreen) {
        fontSize = '1.4rem';
    } else if (isMediumScreen) {
        fontSize = '2.2rem';
    } else if (isLargeScreen) {
        fontSize = '3.2rem';
    }

    let bottom = 85;
    let right = 40;
    let width = 'auto';

    if (isSmallScreen) {
        bottom = 130;
        right = 0;
        width = '100%';
    }

    return (
        <motion.div
            style={{
            position: 'absolute',
            overflow: 'hidden',
            top: 450,
            left: 0,
            height: 350,
            width: '100%',
            background: `linear-gradient(180deg, transparent 16%, ${theme.palette.secondary.main} 86%)`,
            zIndex: 10,
            pointerEvents: 'none'
        }}
            animate={{
            background: `linear-gradient(180deg, transparent 16%, ${theme.palette.secondary.main} 86%)`
        }}
            transition={{
            duration: 0.1
        }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                position: 'absolute',
                bottom: -70,
                height: '100%',
                width: '100%',
                px: 5
            }}>
                <Wrapper>
                    <Reveal>
                        <MotionTypography
                            animate={{
                            fontSize
                        }}
                            transition={{
                            duration: 0.3
                        }}
                            sx={{
                            fontFamily: 'GenSekiGothic',
                            letterSpacing: 2,
                            pointerEvents: 'fill'
                        }}>
                            {gpxData && gpxData.name}
                        </MotionTypography>
                    </Reveal>
                    
                </Wrapper>
            </Box>
            <TimeContainer
                animate={{
                    bottom: bottom,
                    right: right,
                    width: width
                }}
                transition={{ duration: 0.15 }}
            >
                <TimeInput/>
            </TimeContainer>
        </motion.div>
    );
};

export default LinearGradientContainer;