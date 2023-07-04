import { FC } from 'react'
import Event from './Event'
import { GroupModel, EventModel } from '../types/models'
import { AuthUserModel } from '../types/models'
import { Link } from 'react-router-dom'

interface GroupProps {
    group: GroupModel,
    currentUser: AuthUserModel | null
}

const Group: FC<GroupProps> = ({ group, currentUser }) => {

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
                <h3 className='text-2xl flex-grow font-semibold'>
                    {group.title}
                </h3>
                <div className='font-light'>
                    Created by {group.owner.name}
                </div>
            </div>
            <p className='text-lg my-1'>
                {group.description}
            </p>
            <div className='text-sm'>
                {group.members.length} members including mutual connections
            </div>
            <div className='text-sm'>
                Usually active from {group.time} on {group.date} at {group.place}
            </div>
            <div className='flex items-center mt-2 gap-x-2'>
                {group.events.length === 0 ? (
                    <div className=''>
                        This group does not have any ongoing event yet
                    </div>
                ) :
                    <div className=''>
                        {group.events.length} ongoing events -
                    </div>
                }
                <ul className='flex gap-x-1'>
                    {group.events.map((event, index) => {
                        const isLastItem = index === group.events.length - 1;
                        const comma = isLastItem ? '' : ',';
                        return (
                            <li key={event._id}>
                                {event.title}{comma}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className='flex gap-x-3 items-center ml-auto'>
                <Link to={`/groups/${group._id}`} className='bg-amber-100 rounded-md px-3 py-2 w-28 mt-4' >
                    View Group
                </Link>
                <button className='bg-amber-100 rounded-md px-3 py-2 w-28 mt-4' onClick={joinGroup}>
                    Join group
                </button>
            </div>

        </li>
    )
}

export default Group