import ErrorPage from "../../pages/ErrorPage";
import MainPage from "../../pages/MainPage";
import RacePage from "../../pages/RacePage";
import { RouteConfig } from "../../types/RouteConfig";

const mainRoute = {
    MAIN: {
        name: 'Main',
        path: '/',
        component: MainPage,    
    }as RouteConfig,
};

const raceRoute = {
    RACES: {
        name: 'Race',
        path: '/races/:raceName',
        component: RacePage,
    } as RouteConfig,
}

const errorRoute = {
    ERROR: {
        name: 'Error',
        path: '/badpage',
        component: ErrorPage,
    }as RouteConfig,
};

export const routes = Object.freeze({
    ...mainRoute,
    ...raceRoute,
    ...errorRoute,
    ERRORREDIRECT:{
        name: 'ErrorRedirect',
        path: '*',
        to: errorRoute.ERROR.path
    }as RouteConfig
});