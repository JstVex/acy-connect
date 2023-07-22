import { FC, useEffect, useState } from 'react'
import { GroupModel, UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface JoinedGroupProps {
    group: GroupModel;
    currentUser: UserModel | null;
}

const JoinedGroup: FC<JoinedGroupProps> = ({ group, currentUser }) => {
    const [mutualFriends, setMutualFriends] = useState<UserModel[]>([]);

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
        <li className="flex flex-col bg-white rounded-md shadow-md p-3 my-3">
            <h3 className="text-2xl flex-grow font-semibold text-amber-800">
                {group.title}
            </h3>
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
            <div className="flex justify-end">
                <Link
                    to={`/groups/${group._id}`}
                    className="bg-amber-800 text-white rounded-md px-3 py-2 text-sm"
                >
                    View Group
                </Link>
            </div>
        </li>
    )
}

export default JoinedGroup