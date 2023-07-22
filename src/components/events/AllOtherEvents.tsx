import { FC } from 'react'
import { EventModel, UserModel } from '../../types/models'

interface AllOtherEventsProps {
    event: EventModel
    user: UserModel
}

const AllOtherEvents: FC<AllOtherEventsProps> = ({ event, user }) => {
    const handleParticipating = async () => {
        try {
            const response = await fetch(`http://localhost:4080/events/${event._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('successful participating', data)
            }

        } catch (error) {
            console.log("Error participating", error)
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
                {event.date} at {event.time}
            </div>
            <div className='flex gap-x-3 items-center'>
                <div>
                    {event.participants.length} participating
                </div>
                <button className='text-amber-600 ml-auto' onClick={handleParticipating}>
                    Participate
                </button>
            </div>
        </li>
    )
}

export default AllOtherEvents