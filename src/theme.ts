import { PaletteMode, createTheme } from "@mui/material";
import { darkMode, light, lightMode } from "./utils/constants/palette";

const theme = (mode:PaletteMode | undefined) => createTheme({
    palette:{
        mode,
        ...(mode===light)?lightMode:darkMode
    },
    transitions:{
        duration:{
            standard:2000
        }
    }
});

export default theme;