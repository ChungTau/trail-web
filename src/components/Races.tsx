import GPX, {Track, Waypoint} from 'gpxparser';
import {styled, useTheme} from "@mui/material";
import {Wrapper} from "./Wrapper";
import GpxParser from 'gpxparser';
import {useEffect, useState} from 'react';
import Race from './Race';
import {Reveal} from './Reveal';
import {Link} from 'react-router-dom';
import {Variants, motion} from 'framer-motion';
const MotionLink = motion(Link);

const linkTransition : Variants = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    }
};

const gpxFiles = ['gpx1.gpx', 'gpx2.gpx', 'gpx3.gpx', 'gpx4.gpx']; // replace with your actual file names

function Races() {
    const theme = useTheme();
    const RacesContainer = styled('div')({
        backgroundColor: theme.palette.primary.light,
        borderRadius: '1.4rem',
        minHeight: '300px',
        width: '100%',
        padding: '10px 20px 10px 20px',
        '@media (max-width:960px)': {
            padding: '6px 4px 6px 4px'
        },
        '@media (max-width:600px)': {
            padding: '4px 0px 4px 0px'
        }
    });

    const [gpxData,
        setGpxData] = useState < any[] > ([]);

        useEffect(() => {
            Promise.all(
              gpxFiles.map(async (file) => {
                const response = await fetch(`${process.env.PUBLIC_URL}/gpxs/${file}`);
                const text = await response.text();
                const parser = new GpxParser();
                parser.parse(text);
                return {
                  name: file,
                  data: parser.tracks[0]
                };
              })
            )
            .then(setGpxData);
          }, []);

    return (
        <Wrapper>
            <RacesContainer>
                {gpxData.map((gpx : {
                    name: string,
                    data: Track
                }) => {
                    return (
                        <Reveal width='100%'>
                            <MotionLink
                                style={{
                                textDecoration: 'none'
                            }}
                                to={`/races/${gpx
                                .name
                                .split('.gpx')[0]}`}
                                variants={linkTransition}
                                initial="hidden"
                                animate="show">
                                <Race gpx={gpx.data}/>
                            </MotionLink>
                        </Reveal>
                    );
                })}
            </RacesContainer>
        </Wrapper>
    );
};

export default Races;
