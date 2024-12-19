import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import './styles/MyCalendar.css'
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import axios from 'axios';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [events, setEvents] = useState([])
    const { userData } = useContext(UserContext);

    useEffect(() => {
        if (userData?.username) {
            axios.get(`http://localhost:5000/meetings/${userData.username}`)
                .then((response) => {
                    console.log(response.data)  
                    const meetings = response.data || [];
                    setEvents(
                        meetings.map(meeting => {
                            const [year, month, day] = meeting.date.split('T')[0].split('-');
                            const [hours, minutes, seconds] = meeting.time.split(':');
            
                            const start = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
                            const end = new Date(start);
                            end.setUTCHours(start.getUTCHours() + 1);
            
                            return {
                                meetingid: meeting.meetingid,
                                title: meeting.title,
                                start: start.toISOString(),
                                end: end.toISOString(),
                            };
                        })
                    );
                })
                .catch((error) => {
                console.error('Error fetching meeting details:', error);
                });
            }
    }, [])

    const handleSelectEvent = (event) => {
        console.log(event)
    }

    return (
        <div className='calendar-content'>
            <Calendar
                views={["day", "month","agenda"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "90vh" }}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    )
}

export default MyCalendar