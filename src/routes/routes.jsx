import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/errorpage/errorpage";
import Root from "../pages/root/root";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:Root,
        errorElement:<ErrorPage></ErrorPage>
    }
])

