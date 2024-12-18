import { Navigate } from 'react-router-dom';

import NewMeeting from "../pages/NewMeeting"
import Meetings from "../pages/Meetings"
import Tasks from "../pages/Tasks"
import Calendar from "../pages/Calendar"
import Completed from "../pages/Completed"
import Upcoming from '../pages/Upcoming';
import Meetinfo from '../pages/Meetinfo';
import Details from "../pages/Details"
import Minutes from '../pages/Minutes';
import MeetTasks from '../pages/MeetTasks';
import Attendance from '../pages/Attendance';
import Report from '../pages/Report';
import UpdateMeetingDetails from '../pages/UpdateMeetingDetails';
import UpdateMinutes from '../pages/UpdateMinutes';
import Mytasks from '../pages/Mytasks';
import AssignedTasks from '../pages/AssignedTasks';
import Mymeeting from '../pages/Mymeeting';


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
            },
            {
                path: 'mymeeting',
                element: <Mymeeting />
            }
        ]
    },
    {
        path: '/tasks',
        element: <Tasks/>,
        children: [
            {
                path: '',
                element: <Navigate to="mytasks" />  
            },
            {
                path: 'mytasks',
                element: <Mytasks/>
            },
            {
                path: 'assignedtasks',
                element: <AssignedTasks/>
            }
        ]
    },
    {
        path: '/calendar',
        element: <Calendar/>
    },
    {
        path: '/meetings/:meetingid',
        element: <Meetinfo/>,
        children: [
            {
                path: '',
                element: <Navigate to="details" />  
            },
            {
                path: 'details',
                element: <Details />,
            },
            {
                path: 'minutes',
                element: <Minutes/>
            },
            {
                path: 'tasks',
                element: <MeetTasks />
            },
            {
                path: 'attendance',
                element: <Attendance/>
            },
            {
                path: 'report',
                element: <Report/>
            },
        ]
    },
    {
        path: '/updatemeetingdetails/:meetingid',
        element: <UpdateMeetingDetails />
    },
    {
        path: '/meetings/:meetingid/updateminutes/:minuteid',
        element: <UpdateMinutes />
    }
]

export default routes;