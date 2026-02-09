import { createBrowserRouter } from "react-router-dom";



import UpcomingEvent from "../Components/UpcomingEvent/UpcomingEvent";
import CreateEvent from "../pages/createEvent/createEvent";
import ErrorPage from "../pages/errorpage/errorpage";
import EventDetails from "../pages/EventDetails/EventDetails";
import Home from "../pages/Home/Home";
import JoinedEvent from "../pages/JoinedEvent.jsx/JoinedEvent";
import Login from "../pages/Login/Login";
import ManageEvents from "../pages/ManageEvents.jsx/ManageEvents";
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
                path:'Upcoming-events',
                Component:UpcomingEvent
                
            },
            {
                path:'createEvent',
                Component:CreateEvent
            },
            {
                path:'event/:id',
                Component:EventDetails
            },
            {
                path:'joined-events',
                Component:JoinedEvent
            },
            {
                path:'manage-events',
                Component:ManageEvents
            }

      
        ]
    }
])
