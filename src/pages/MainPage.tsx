import {Fab, styled, useTheme} from "@mui/material";
import {AnimatePresence, LayoutGroup, Variants, delay, motion} from "framer-motion";
import {useContext, useState} from "react";
import {ColorModeContext} from "../contexts/ColorModeContext";
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {dark} from "../utils/constants/palette";
import PreLoader from "../components/PreLoader";
import Hero from "../components/Hero";
import Races from "../components/Races";

// Declare this outside of MainPage to avoid unnecessary recreations.
const FloatButton = styled(Fab)(({theme}) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: theme.palette.iconButton.main,
    '&:hover': {
        backgroundColor: theme.palette.iconButton.light
    }
}));

function MainPage() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [loading,
        setLoading] = useState(true);
    return (
        <motion.div
            style={{
            backgroundColor: theme.palette.secondary.main,
            overflowX: 'hidden',
            width: '100vw',
            height: '100%'
        }}
            animate={{
            backgroundColor: theme.palette.secondary.main
        }}
            transition={{
            duration: 0.3,
            delay:0.1
        }}>
            <LayoutGroup>
                <AnimatePresence>
                    {loading
                        ? (<motion.div>
                            <PreLoader setLoading={setLoading} replay={false}/>
                        </motion.div>)
                        : (
                            <main>
                                <Hero/>
                                <Races/>
                                <FloatButton onClick={colorMode.toggleColorMode}>
                                    <DarkModeSwitch
                                        checked={theme.palette.mode === dark}
                                        sunColor='#f8f8f8'
                                        onChange={() => {}}
                                        size={20}/>
                                </FloatButton>
                            </main>
                        )}
                </AnimatePresence>
            </LayoutGroup>
        </motion.div>
    );
}

export default MainPage;