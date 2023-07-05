import { FC, useEffect, useState } from 'react'
import { GroupModel, UserModel } from '../types/models'
import { AuthUserModel } from '../types/models'
import { Link } from 'react-router-dom'

interface GroupProps {
    group: GroupModel,
    currentUser: AuthUserModel | null
}

const Group: FC<GroupProps> = ({ group, currentUser }) => {
    const [mutualFriends, setMutualFriends] = useState<UserModel[]>([]);

    const joinGroup = async () => {
        try {
            const response = await fetch('http://localhost:4080/groups/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: currentUser?._id, id: group._id })
            })

            if (response.ok) {
                const body = await response.json();
                console.log('Updated group:', body)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchMutualFriends = async () => {
            try {
                const response = await fetch(`http://localhost:4080/users/mutualfriends/${currentUser?._id}/${group._id}`);

                if (response.ok) {
                    const data = await response.json();
                    setMutualFriends(data);
                }

            } catch (error) {
                console.log('Error fetching mutual friends', error);
            }
        };

        fetchMutualFriends();
    }, [currentUser?._id, group._id])

    return (
        <li className="flex flex-col bg-white rounded-md shadow-md p-3">
            <div className="flex items-center mb-0.5">
                <h3 className="text-2xl flex-grow font-semibold text-amber-800">
                    {group.title}
                </h3>
                <div className="font-light text-gray-500">
                    Created by {group.owner.name}
                </div>
            </div>
            <p className="text-lg my-1 text-gray-800">
                {group.description}
            </p>
            {mutualFriends.length === 0 ? (
                <div className="text-sm text-gray-600">
                    {group.members.length} members
                </div>
            ) : (
                <div className="text-sm text-gray-600">
                    {group.members.length} members including {mutualFriends.length} mutual <span>
                        {mutualFriends.length === 1 ? "connection" : "connections"}
                    </span>
                </div>
            )}
            <div className="text-sm text-gray-600">
                Usually active from {group.time} on {group.date} at {group.place}
            </div>
            <div className="flex items-center mt-2 gap-x-2">
                {group.events.length === 0 ? (
                    <div className="text-gray-800">
                        This group does not have any ongoing event yet
                    </div>
                ) : (
                    <div className="text-gray-800">
                        {group.events.length} ongoing events -
                    </div>
                )}
                <ul className="flex gap-x-1 text-amber-800">
                    {group.events.map((event, index) => {
                        const isLastItem = index === group.events.length - 1;
                        const comma = isLastItem ? "" : ",";
                        return (
                            <li key={event._id}>
                                {event.title}
                                {comma}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mt-2 flex justify-end">
                <Link
                    to={`/groups/${group._id}`}
                    className="bg-amber-800 text-white rounded-md px-3 py-2 text-sm"
                >
                    View Group
                </Link>
                <button className="bg-amber-800 text-white rounded-md px-3 py-2 ml-3 text-sm" onClick={joinGroup}>
                    Join group
                </button>
            </div>
        </li>
    )
}

export default Group