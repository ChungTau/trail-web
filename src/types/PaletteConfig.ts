import { dark, light } from "../utils/constants/palette";
declare module '@mui/material/styles' {
    interface Palette {
        iconButton : Palette['primary'];
    }

    interface PaletteOptions {

        iconButton : PaletteOptions['primary'];
    }
}
export type colorModeType = typeof dark | typeof light;