import { styled } from "@mui/material";
import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const container : Variants = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const SlideDownRef = styled('div')({position: "relative", width: '100%', overflow: "hidden"});

interface SlideDownProps{
    children: JSX.Element;
}

function SlideDown({children}:SlideDownProps){
    const mainControls = useAnimation();

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden");
        }
    }, [isInView, mainControls]);

    return(
        <SlideDownRef ref={ref}>
            <motion.div
                    initial="hidden"
                    animate={mainControls}
                    transition={{
                    ease: "easeOut",
                    duration: 0.5,
                    delay: 0.4
                }}
                    variants={container}>
                        {children}
                    </motion.div>
        </SlideDownRef>
    );
}

export default SlideDown;