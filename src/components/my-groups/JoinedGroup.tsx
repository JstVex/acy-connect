import { FC } from 'react'
import { GroupModel } from '../../types/models'

interface JoinedGroupProps {
    group: GroupModel
}

const JoinedGroup: FC<JoinedGroupProps> = ({ group }) => {
    return (
        <li className='flex flex-col ring-1 ring-zinc-900 rounded-md shadow-md my-5 p-3'>
            <div className='flex items-center '>
                <h3 className='text-lg flex-grow'>
                    {group.title}
                </h3>
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
            {/* <div>
                On going events
            </div>
            <div>
                {group.events.map((event: any) => {
                    return <Event event={event} />
                })}
            </div> */}
        </li>
    )
}

export default JoinedGroup