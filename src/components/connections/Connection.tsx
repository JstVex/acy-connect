import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface ConnectionProps {
    user: UserModel
}

const Connection: FC<ConnectionProps> = ({ user }) => {
    return (
        <Link to={`${user._id}`}>
            <li className='p-3 rounded-md hover:bg-amber-100/40 '>
                <div className='flex items-center gap-x-3'>
                    {user.image ? (
                        <img src={user.image} alt="" className='w-auto h-auto max-w-[45px] max-h-[45px] aspect-square rounded-full' />
                    ) : (
                        <img src="/src/assets/placeholder.jpeg" alt="" className='w-auto h-auto max-w-[45px] max-h-[45px] aspect-square rounded-full' />
                    )}

                    <div className='flex flex-col'>
                        <div className='text-md'>
                            {user.name}
                        </div>
                        <div className='font-light text-sm'>
                            {user.email}
                        </div>
                    </div>
                    <div className='ml-auto text-amber-600 cursor-pointer'>
                        Unfriend
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default Connection