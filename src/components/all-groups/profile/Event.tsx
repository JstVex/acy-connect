import { FC } from 'react'
import { EventModel } from '../../../types/models'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

interface EventProps {
    event: EventModel;
}

const Event: FC<EventProps> = ({ event }) => {
    const { user } = useContext(AuthContext);

    const participants = event.participants;
    const totalParticipants = participants.length;

    const renderParticipantImages = () => {
        const maxDisplayedParticipants = 2;
        const displayedParticipants = participants.slice(0, maxDisplayedParticipants);
        const remainingParticipantsCount = totalParticipants - maxDisplayedParticipants;

        return displayedParticipants.map((participant, index) => (
            <div>
                <img
                    key={participant._id}
                    src={participant.image}
                    alt={participant.name}
                    className={`w-8 h-8 rounded-full object-cover aspect-square absolute -left-${index * 3} z-${maxDisplayedParticipants - index}`}
                    style={{ marginLeft: `${index * 1.5}rem` }}
                />
                {index === 1 && totalParticipants > 2 &&
                    <div className={`w-8 h-8 rounded-full absolute -left-${12} flex items-center justify-center bg-gray-200`} style={{ marginLeft: `${3}rem` }}>
                        +{totalParticipants - 2}
                    </div>
                }
                {index === 1 &&
                    <div className={`absolute -left-${16} top-0.5`} style={{ marginLeft: `${5.5}rem` }}>
                        participants
                    </div>
                }
            </div>
        ));
    };

    const handleParticipating = async () => {
        try {
            const response = await fetch(`http://localhost:4080/events/${event._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user?._id })
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
        <li className="flex flex-col  bg-white rounded-md shadow-md my-4 p-3">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">
                    {event.title}
                </h3>
                <p className="my-1 text-gray-700">
                    {event.description}
                </p>
                <div className="text-sm text-gray-600 mb-2">
                    {event.date} at {event.time}
                </div>
                {totalParticipants > 2 ? (
                    <div className="relative">
                        {renderParticipantImages()}
                    </div>
                ) : (
                    <div>
                        {totalParticipants} participants
                    </div>
                )}

            </div>
            <button
                className="text-sm bg-amber-800 text-white rounded-md px-3 py-2 ml-auto hover:bg-amber-900"
                onClick={handleParticipating}
            >
                Participate
            </button>
        </li>
    )
}

export default Event