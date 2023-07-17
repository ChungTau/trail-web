import { Fab, useTheme } from "@mui/material";
import { ReactNode, useMemo } from 'react';

export interface CustomSmallButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}

const CustomSmallButton: React.FC<CustomSmallButtonProps> = ({ onClick, children }) => {
    const { palette } = useTheme();
    const backgroundColor = useMemo(() => palette.primary.main, [palette]);

    return (
        <Fab
            onClick={onClick}
            size="small"
            style={{ backgroundColor }}>
            {children}
        </Fab>
    );
};

export default CustomSmallButton;
