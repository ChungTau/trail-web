import { PaletteMode, PaletteOptions } from "@mui/material";

export const dark: PaletteMode = 'dark';
export const light: PaletteMode = 'light';
export const colorModeTag = 'color-mode';

export const lightMode: PaletteOptions = {
    primary: {
        main: 'rgba(80,59,250,1)',
        light:  'rgba(18,18,18,0.8)',
    },
    secondary: {
        main: 'rgba(243,246,253,1)',
        light: 'rgba(255,255,255,1)',
        dark: 'rgba(243,246,253,0.5)'
    },
    iconButton:{
        main: 'rgba(80,59,250,1)',
        light: 'rgba(80,59,250,0.8)',
    }
};

export const darkMode : PaletteOptions = {
    primary: {
        main: 'rgba(150, 97, 242,1)',
        light:  'rgba(255, 255, 255,0.9)',
    },
    secondary: {
        main: 'rgba(18,18,18,1)',
        light: 'rgba(54,54,54,1)',
        dark: 'rgba(18,18,18,0.5)',
    },
    iconButton:{
        main: 'rgba(54,54,54,1)',
        light: 'rgba(54,54,54,0.8)'
    }
    
};