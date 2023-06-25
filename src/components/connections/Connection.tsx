import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface ConnectionProps {
    user: UserModel
}

const Connection: FC<ConnectionProps> = ({ user }) => {
    return (
        <Link to={`${user._id}`}>
            <li className='border border-zinc-900/10 shadow-sm rounded-lg my-5 p-3'>
                <div className='flex items-center gap-x-3'>
                    <img src={user.image} alt="" className='w-auto h-auto max-w-[48px] max-h-[48px] aspect-square rounded-full' />
                    <div className='flex flex-col'>
                        <div className='text-lg'>
                            {user.name}
                        </div>
                        <div className='font-light'>
                            {user.email}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default Connection