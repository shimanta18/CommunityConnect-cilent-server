import { createBrowserRouter } from "react-router-dom";


import CreateEvent from "../Components/CreateEvent/CreateEvent";
import ErrorPage from "../pages/errorpage/errorpage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/register/register";
import Root from "../pages/root/root";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:Root,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                loader:()=>fetch('feature.json'),
                path:"/",
                Component:Home,
            },
            {
               path:'register',
               Component:Register
            },
            {
                path:'login',
                Component:Login
            },
            {
                path:'CreateEvent',
                Component:CreateEvent
            },

      
        ]
    }
])
