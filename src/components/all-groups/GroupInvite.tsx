import { FC } from 'react'
import { GroupModel, UserModel } from '../../types/models'

interface GroupInviteProps {
    mutual: UserModel | any;
    user: UserModel;
    group: GroupModel;
}

const GroupInvite: FC<GroupInviteProps> = ({ mutual, user, group }) => {
    const handleInvitation = async () => {
        try {
            const response = fetch('http://localhost:4080/users/groupinvitation', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senderId: user._id, recipientId: mutual.user1._id, groupId: group._id })
            })
        } catch (error) {
            console.log('Error sending invitation', error)
        }
    }

    return (
        <li className='flex my-1'>
            <div className='flex items-center gap-x-3'>
                {mutual.user1.image ? (
                    <img src={mutual.image} alt="" className='w-auto h-auto max-w-[35px] max-h-[35px] aspect-square object-cover rounded-full' />
                ) : (
                    <img src="/src/assets/placeholder.jpeg" alt="" className='w-auto h-auto max-w-[30px] max-h-[30px] object-cover aspect-square rounded-full' />
                )}
                <div>
                    {mutual.user1.name}
                </div>
            </div>
            <div className='ml-auto text-amber-600 cursor-pointer' onClick={handleInvitation}>
                invite
            </div>
        </li>
    )
}

export default GroupInvite