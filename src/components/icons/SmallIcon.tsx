import {IconType} from "react-icons/lib";

export interface smallIconProps {
    Icon : IconType;
    color : string;
};

const SmallIcon = ({Icon, color} : smallIconProps) => ( < Icon style = {{
                    color: color,
                    fontSize:20
                }}/>
);

export default SmallIcon;