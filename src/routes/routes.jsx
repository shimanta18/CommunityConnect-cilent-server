import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/errorpage/errorpage";
import Home from "../pages/Home/Home";
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
            }
        ]
    }
])
