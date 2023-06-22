import { FC, useEffect, useState } from 'react'
import Event from './Event'
import { UserModel } from '../types/models'
import { GroupModel } from '../types/models'
import { AuthUserModel } from '../types/models'

interface GroupProps {
    group: GroupModel,
    users: UserModel[],
    currentUser: AuthUserModel | null
}

const Group: FC<GroupProps> = ({ group, users, currentUser }) => {
    const [ownerName, setOwnerName] = useState('');

    useEffect(() => {
        const owner = users.find((user) => user._id === group.owner);
        if (owner) {
            setOwnerName(owner.name);
        }
    }, [group.owner, users]);

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

    return (
        <li className='flex flex-col ring-1 ring-zinc-900 rounded-md shadow-md my-5 p-3'>
            <div className='flex items-center '>
                <h3 className='text-lg flex-grow'>
                    {group.title}
                </h3>
                <div className='font-light'>
                    Created by {ownerName}
                </div>
            </div>
            <p className='my-1'>
                {group.description}
            </p>
            <div className='text-sm'>
                {group.members.length} members including mutual connections
            </div>
            <div className='text-sm'>
                Usually active from {group.time} on {group.date} at {group.place}
            </div>
            <div>
                On going events
            </div>
            <div>
                {group.events.map((event: any) => {
                    return <Event event={event} />
                })}
            </div>
            <button className='bg-amber-100 rounded-md px-3 py-2 w-28 mt-4' onClick={joinGroup}>
                Join group
            </button>
        </li>
    )
}

export default Group