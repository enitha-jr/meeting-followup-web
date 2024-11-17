import { Navigate } from 'react-router-dom';

import NewMeeting from "../pages/NewMeeting"
import Meetings from "../pages/Meetings"
import Tasks from "../pages/Tasks"
import Calendar from "../pages/Calendar"
import Details from "../pages/Details"
import Completed from "../pages/Completed"
import Upcoming from '../pages/Upcoming';
import Meetinfo from '../pages/MeetInfo';
const routes = [
    {
        path: '/',
        element: <Navigate to="/meetings/upcoming" />
    },
    {
        path: '/newmeeting',
        element: <NewMeeting/>
    },
    {
        path: '/meetings',
        element: <Meetings />,
        children: [
            {
                path: '',
                element: <Navigate to="upcoming" />  // Redirect from /meetings to /meetings/upcoming
            },
            {
                path: 'upcoming',
                element: <Upcoming />
            },
            {
                path: 'completed',
                element: <Completed/>
            }
        ]
    },
    {
        path: '/tasks',
        element: <Tasks/>
    },
    {
        path: '/calendar',
        element: <Calendar/>
    },
    {
        path: '/meetings/:id',
        element: <Meetinfo/>,
        children: [
            {
                path: '',
                element: <Navigate to="details" />  
            },
            {
                path: 'details',
                element: <Details />
            },
        ]
    }
]

export default routes;