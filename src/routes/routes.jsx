import NewMeeting from "../pages/NewMeeting"
import Meetings from "../pages/Meetings"
import Tasks from "../pages/Tasks"
import Calendar from "../pages/Calendar"
import Details from "../pages/Details"
const routes = [
    {
        path: '/newmeeting',
        element: <NewMeeting/>
    },
    {
        path: '/meetings',
        element: <Meetings/>
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
        path: '/meetings/:id/details',
        element: <Details />
    }

]

export default routes;