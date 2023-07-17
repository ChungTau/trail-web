import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import {Box, Typography, styled} from "@mui/material";

const StyledTextField = styled(TextField)`
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TimeInput = () => {
    const [hours,
        setHours] = useState("29");
    const [minutes,
        setMinutes] = useState("00");

    const handleHourChange = (event : ChangeEvent < HTMLInputElement >) => {
        setHours(event.target.value);
    };

    const handleMinuteChange = (event : ChangeEvent < HTMLInputElement >) => {
        setMinutes(event.target.value);
    };

    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'fill',
            mt: 1
        }}>
            <StyledTextField
                type="number"
                variant="outlined"
                sx={{
                width: 65,
                textAlign: 'center'
            }}
                size="small"
                placeholder="HH"
                value={hours}
                onChange={handleHourChange}
                InputProps={{
                inputProps: {
                    min: 0,
                    style: {
                        fontWeight: 600,
                        textAlign: 'center',
                        letterSpacing: 2,
                        overflow: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        
                    }
                }
            }}/>
            <Typography mx={1}>:</Typography>
            <StyledTextField
                type="number"
                sx={{
                width: 65,
                textAlign: 'center'
            }}
                size="small"
                variant="outlined"
                placeholder="mm"
                value={minutes}
                onChange={handleMinuteChange}
                InputProps={{
                inputProps: {
                    min: 0,
                    max: 59,
                    style: {
                        fontWeight: 600,
                        textAlign: 'center',
                        letterSpacing: 2,
                        overflow: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }
                }
            }}/>
        </Box>
    );
};

export default TimeInput;
