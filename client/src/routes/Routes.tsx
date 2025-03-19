import { lazy } from "react";
import { IRoute } from "../typings";

/**
 * @description All the links with it's  nature (public/ protected)
 * @example 
 * public Route:
 * {
        path: "/",
        component: lazy(() => import("../pages/Home")),
        protected: false
    }
 */
export const ROUTES: IRoute[] = [
    {
        path: "/",
        component: lazy(() => import("../components/authentication/Login")),
        protected: false
    },
    {
        path: "/register",
        component: lazy(() => import("../components/authentication/Register")),
        protected: false
    },
    {
        path: "/dashboard",
        component: lazy(() => import("../pages/Home")),
        protected: true
    },
    {
        path: "*",
        component: lazy(() => import("../pages/NotFound")),
        protected: false
    }
]