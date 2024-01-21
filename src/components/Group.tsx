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

    const members = group.members;
    const totalMembers = members.length;
    const totalMutuals = mutualFriends.length;

    const renderMemberImages = () => {
        const maxDisplayedMembers = 4;
        const displayedMembers = members.slice(0, maxDisplayedMembers);
        const displayMutuals = mutualFriends.slice(0, maxDisplayedMembers)

        return (totalMutuals >= 4 ? displayMutuals : displayedMembers).map((member, index) => (
            <div>
                {member.image ? (
                    <img
                        key={member._id}
                        src={member.image}
                        alt={member.name}
                        className={`w-8 h-8 rounded-full object-cover aspect-square absolute -left-${index * 3} z-${maxDisplayedMembers - index}`}
                        style={{ marginLeft: `${index * 1.5}rem` }}
                    />
                ) : (
                    <img
                        key={member._id}
                        src='/src/assets/placeholder.jpeg'
                        alt={member.name}
                        className={`w-8 h-8 rounded-full object-cover aspect-square absolute -left-${index * 3} z-${maxDisplayedMembers - index}`}
                        style={{ marginLeft: `${index * 1.5}rem` }}
                    />
                )}

                {totalMembers > 5 &&
                    <div className={`w-8 h-8 rounded-full absolute -left-${5} flex items-center justify-center text-amber-800`} style={{ marginLeft: `${6.5}rem` }}>
                        +{totalMembers - 4}
                    </div>
                }
            </div >
        ));
    };

    // const joinGroup = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/groups/join', {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ user: currentUser?._id, id: group._id })
    //         })

    //         if (response.ok) {
    //             const body = await response.json();
    //             console.log('Updated group:', body)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        const fetchMutualFriends = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/mutualfriends/${currentUser?._id}/${group._id}`);

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
        <li className="flex flex-col bg-white rounded-3xl shadow-sm py-3 px-5 ring-1 ring-gray-200">
            <div className="flex flex-col mb-0.5 pb-3 border-b border-gray-200">
                <h3 className="text-2xl flex-grow font-semibold text-amber-800">
                    {group.title}
                </h3>
                <div className="font-light text-gray-500 text-sm sm:text-md">
                    Created by {group.owner.name}
                </div>
            </div>
            <p className="text-md my-1 text-gray-600">
                {group.description}
            </p>
            <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                Usually active from {group.time} on {group.date} at {group.place}
            </div>
            <div className="relative mt-5 mb-8">
                {renderMemberImages()}
            </div>
            <div className="mt-auto flex justify-end gap-x-2">
                <Link
                    to={`/groups/${group._id}`}
                    className="bg-amber-800 text-white rounded-3xl px-3 py-2 text-xs sm:text-sm"
                >
                    View Group
                </Link>
            </div>
        </li >
    )
}

export default Group