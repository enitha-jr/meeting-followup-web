import NewMeeting from "../pages/NewMeeting"
import Meetings from "../pages/Meetings"
import Tasks from "../pages/Tasks"
import Calendar from "../pages/Calendar"

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

]

export default routes;