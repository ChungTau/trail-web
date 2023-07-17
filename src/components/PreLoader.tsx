import {styled} from "@mui/material";
import {HTMLMotionProps, Variants, motion} from "framer-motion";
import {useCallback, useEffect, useState} from "react";

interface PreLoaderProps extends HTMLMotionProps < "div" > {
    setLoading: React.Dispatch < React.SetStateAction < boolean >>;
    delay?: number;
    replay: boolean;
    duration?: number;
}

const PreLoaderContainer = styled(motion.div)({
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Bungee Inline',
    overflow: 'hidden',
    minWidth: '100vw'
});

const PreLoaderInner = styled(motion.h1)({
    display: 'flex',
    overflow: 'hidden',
    fontSize: '72px',
    '@media (max-width: 600px)': {
        fontSize: '32px'
    }
});

const child : Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 4,
            stiffness: 400
        } // You can adjust the duration as needed.
    },
    hidden: {
        opacity: 0,
        y: 20
    }
};

const PreLoader = ({
    setLoading,
    delay = 0.1,
    replay,
    duration = 0.1
  }: PreLoaderProps) => {
    const [exit, setExit] = useState(false);
    const letters = Array.from("Trail Running");
    const onAnimationComplete = useCallback(() => {
      setTimeout(() => setLoading(false), 500);
    }, [setLoading]);
  
    useEffect(() => {
      const timeout = setTimeout(() => setExit(true), replay?4000:0); // auto fadeout after 3 seconds, adjust as needed
      return () => clearTimeout(timeout);
    }, []);
  
    const container: Variants = {
      hidden: {
        opacity: 0
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: i * delay
        }
      }),
      exit: {
        opacity: 0,
        transition: {
          staggerChildren: duration,
          duration: 0.8
        }
      }
    };
    
    return (
      <PreLoaderContainer
        className="loader"
        initial='hidden'
        animate={exit ? 'exit' : (replay ? "visible" : "hidden")}
        onAnimationComplete={onAnimationComplete}>
        <PreLoaderInner
          layoutId="main-title-container"
          variants={container}>
          {letters.map((letter, index) => (
            <motion.span variants={child} key={index}>
              {letter === " "
                ? "\u00A0\u00A0\u00A0"
                : letter}
            </motion.span>
          ))}
        </PreLoaderInner>
      </PreLoaderContainer>
    );
  };
  
  export default PreLoader;
