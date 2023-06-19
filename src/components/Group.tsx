import { FC } from 'react'
import Event from './Event'

interface GroupProps {
    group: any
}

const Group: FC<GroupProps> = ({ group }) => {
    return (
        <li className='flex flex-col ring-1 ring-zinc-900 rounded-md shadow-md my-5 p-3'>
            <div className='flex items-center '>
                <h3 className='text-lg flex-grow'>
                    {group.title}
                </h3>
                <div className='font-light'>
                    Created by {group.owner}
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
            <button className='bg-amber-100 rounded-md px-3 py-2 w-28 mt-4'>
                Join group
            </button>
        </li>
    )
}

export default Group