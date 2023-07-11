import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventModel, GroupModel, UserModel } from '../types/models'
import { Link } from 'react-router-dom'
import MembersModal from '../components/all-groups/MembersModal'
import CreateEventsModal from '../components/all-groups/CreateEventsModal'
import Event from '../components/all-groups/profile/Event'

interface GroupProfileProps {
    props?: string
}

const GroupProfile: FC<GroupProfileProps> = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<GroupModel | null>(null);

    const [membersModalIsOpen, setMembersModalIsOpen] = useState(false);
    const [eventsModalIsOpen, setEventsModalIsOpen] = useState(false);

    const [user, setUser] = useState<UserModel | null>(null);
    const [mutualFriends, setMutualFriends] = useState<UserModel[]>([]);
    const [events, setEvents] = useState<EventModel[]>([]);

    const [isMember, setIsMember] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:4080/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });


                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const fetchGroup = async () => {
            try {
                const response = await fetch(`http://localhost:4080/groups/${groupId}`);

                if (response.ok) {
                    const data = await response.json();
                    setGroup(data)

                    const isCurrentUserMember = data.members.some((member: any) => member._id === user?._id);
                    setIsMember(isCurrentUserMember);
                    console.log('member', isMember)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const fetchMutualFriends = async () => {
            try {
                const response = await fetch(`http://localhost:4080/users/mutualfriends/${user?._id}/${groupId}`);

                if (response.ok) {
                    const data = await response.json();
                    setMutualFriends(data);
                }

            } catch (error) {
                console.log('Error fetching mutual friends', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:4080/events/${groupId}`)

                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                    console.log('events are', events)
                }
            } catch (error) {
                console.log('Error fetching events', error)
            }
        }

        fetchCurrentUser();
        fetchGroup();
        fetchMutualFriends();
        fetchEvents();
    }, [groupId, user?._id, isMember])

    // useEffect(() => {
    //     console.log('user connections', user?.connections)
    //     console.log('group:', group)
    // }, [group, user?.connections])

    // if (groupId === undefined) {
    //     return <div>Not avaiable</div>
    // }

    if (group === null || user === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <MembersModal isOpen={membersModalIsOpen} onClose={() => setMembersModalIsOpen(false)} members={group.members} currentUser={user} mutual={mutualFriends} />
            <CreateEventsModal isOpen={eventsModalIsOpen} setIsOpen={setEventsModalIsOpen} onClose={() => setEventsModalIsOpen(false)} groupId={groupId} />
            <div className="w-full max-h-screen overflow-y-auto p-3">
                <div className="flex items-center mb-4">
                    <h3 className="text-4xl capitalize font-semibold">
                        {group.title}
                    </h3>
                    <Link to={`/connections/${group.owner._id}`} className="ml-auto text-lg text-amber-600">
                        Owned by: <span className="capitalize">{group.owner.name}</span>
                    </Link>
                </div>
                <p className="text-xl font-light my-3">
                    {group.description}
                </p>
                <div className="text-lg text-gray-800 mb-2">
                    <span className="font-semibold mr-1">
                        Usual meeting day:
                    </span>
                    {group.date}
                </div>
                <div className="text-lg text-gray-800 mb-2">
                    <span className="font-semibold mr-1">
                        Usual active time:
                    </span>
                    {group.time}
                </div>
                <div className="text-lg text-gray-800 mb-2">
                    <span className="font-semibold mr-1">
                        Usual meeting spot:
                    </span>
                    {group.place}
                </div>
                <div className="my-5">
                    <span className="text-lg text-amber-600 font-semibold cursor-pointer underline underline-offset-2" onClick={() => setMembersModalIsOpen(true)}>
                        {group.members.length} total members including {mutualFriends.length} mutuals
                    </span>
                </div>
                <div className="flex items-center mb-4">
                    {group.events.length === 0 ? (
                        <h3 className="text-lg text-gray-800 font-semibold">
                            No events happening currently
                        </h3>
                    ) : (
                        <h3 className="text-lg text-gray-800 font-semibold">
                            There are {group.events.length} on-going events
                        </h3>
                    )}
                    {isMember && (
                        <button className="text-amber-600 ml-auto font-semibold" onClick={() => setEventsModalIsOpen(true)}>
                            Create an event
                        </button>
                    )}
                </div>
                <ul>
                    {events.map((event) => {
                        return <Event key={event._id} event={event} />;
                    })}
                </ul>
            </div>
        </>
    )
}

export default GroupProfile