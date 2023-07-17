import { To } from "react-router-dom";

export type RouteConfig = {
    icon?: any;
    name: string;
    path: string;
    component?: React.ComponentType | null;
    to?: To;
    outlet?: OutletConfig;
};

export type OutletConfig = {
    [key : string]: RouteConfig;
}