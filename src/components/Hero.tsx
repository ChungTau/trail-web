import styled from "@emotion/styled";
import { Wrapper } from "./Wrapper";
import { Reveal } from "./Reveal";

const HeroWrapper = styled(Wrapper)({
    paddingBottom: "10px",
});

const HeroTitle = styled('h1')({
    fontSize: '6.6rem',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing:1,
    fontFamily: 'Bebas Neue',
    '@media (max-width: 600px)': {
        fontSize: '5.6rem'
    }
});

function Hero(){
    return(
        <HeroWrapper>
            <Reveal>
                <HeroTitle>
                    Upcoming Races
                </HeroTitle>
            </Reveal>
         </HeroWrapper>
    );
}

export default Hero;