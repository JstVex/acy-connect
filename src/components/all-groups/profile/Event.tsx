import { FC } from 'react'
import { EventModel, UserModel } from '../../../types/models'
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

interface EventProps {
    event: EventModel;
    user: UserModel | null;
}

const Event: FC<EventProps> = ({ event, user }) => {
    const participants = event.participants;
    const totalParticipants = participants.length;

    const date = parseISO(event.date)
    const formattedDate = format(date, 'dd.MM.yyyy');

    const renderParticipantImages = () => {
        const maxDisplayedParticipants = 2;
        const displayedParticipants = participants.slice(0, maxDisplayedParticipants);
        const remainingParticipantsCount = totalParticipants - maxDisplayedParticipants;

        return displayedParticipants.map((participant, index) => (
            <div>
                {participant.image ? (
                    <img
                        key={participant._id}
                        src={participant.image}
                        alt={participant.name}
                        className={`w-8 h-8 rounded-full object-cover aspect-square absolute -left-${index * 3} z-${maxDisplayedParticipants - index}`}
                        style={{ marginLeft: `${index * 1.5}rem` }}
                    />
                ) : (
                    <img
                        key={participant._id}
                        src='/src/assets/placeholder.jpeg'
                        alt={participant.name}
                        className={`w-8 h-8 rounded-full object-cover aspect-square absolute -left-${index * 3} z-${maxDisplayedParticipants - index}`}
                        style={{ marginLeft: `${index * 1.5}rem` }}
                    />
                )}

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

    const isUserParticipated = event.participants.some(participant => participant._id === user?._id);
    console.log('isUserparticipated', isUserParticipated)

    const handleParticipating = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${event._id}`, {
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
        <li className={clsx("flex flex-col bg-white rounded-md shadow-md p-3", isUserParticipated && "order-last")}>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">
                    {event.title}
                </h3>
                <p className="my-1 text-gray-700">
                    {event.description}
                </p>
                <div className="text-sm text-gray-600 mb-2">
                    {formattedDate} at {event.time}
                </div>
                {totalParticipants > 2 ? (
                    <div className="relative mb-3">
                        {renderParticipantImages()}
                    </div>
                ) : (
                    <div>
                        {totalParticipants} participants
                    </div>
                )}
            </div>
            {isUserParticipated ? (
                <div
                    className="text-sm text-amber-700 ml-auto mt-2"
                >
                    Participated
                </div>
            ) : (
                <button
                    className="text-sm bg-amber-800 text-white rounded-md px-3 py-2 ml-auto hover:bg-amber-900"
                    onClick={handleParticipating}
                >
                    Participate
                </button>
            )}

        </li>
    )
}

export default Event