import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface MutualListProps {
    member: UserModel
}

const MutualList: FC<MutualListProps> = ({ member }) => {
    return (
        <li>
            <Link to={`/connections/${member._id}`} className='flex items-center gap-x-2'>
                {member.image ? (
                    <img src={member.image} alt="" className='w-auto h-auto max-w-[30px] max-h-[30px] aspect-square rounded-full' />
                ) : (
                    <img src="/src/assets/placeholder.jpeg" alt="" className='w-auto h-auto max-w-[30px] max-h-[30px] aspect-square rounded-full' />
                )}

                <div>
                    {member.name}
                </div>
            </Link>
        </li>
    )
}

export default MutualList