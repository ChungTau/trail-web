import { styled } from "@mui/material";

export const Wrapper = styled('div')({
    position: 'relative',
    zIndex: 10,
    maxWidth: '1150px',
    margin: 'auto',
    padding: '4.6rem',
    overflow: 'hidden',
    '@media (max-width:960px)':{
        padding: '3.6rem'
    },
    '@media (max-width:600px)':{
        padding: '0.6rem'
    }
});