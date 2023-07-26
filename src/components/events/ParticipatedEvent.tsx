import { FC } from 'react'
import { EventModel, UserModel } from '../../types/models';
import { format, parseISO } from 'date-fns';

interface ParticipatedEventProps {
    event: EventModel
    user: UserModel
}

const ParticipatedEvent: FC<ParticipatedEventProps> = ({ event, user }) => {
    const date = parseISO(event.date)
    const formattedDate = format(date, 'dd.MM.yyyy');

    const handleQuit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${event._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('quitted event successfully', data)
            }
        } catch (error) {
            console.log("Error quitting", error)
        }
    }

    return (
        <li className='flex flex-col bg-white rounded-md shadow-md p-3 my-3'>
            <div className='flex items-center'>
                <h3 className='text-lg flex-grow font-semibold text-amber-800'>
                    {event.title}
                </h3>
                <div className='font-light text-gray-600'>
                    group: {event.group.title}
                </div>
            </div>
            <p className='my-1 font-light'>
                {event.description}
            </p>
            <div className='text-sm'>
                {formattedDate} at {event.time}
            </div>
            <div className='flex gap-x-3 items-center'>
                <div>
                    {event.participants.length} participating
                </div>
                <button className='text-rose-700 ml-auto' onClick={handleQuit} >
                    Quit Event
                </button>
            </div>
        </li>
    )
}

export default ParticipatedEvent