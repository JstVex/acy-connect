import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface NonMutualListProps {
    member: UserModel
    currentUser: UserModel | null
}

const NonMutualList: FC<NonMutualListProps> = ({ member, currentUser }) => {
    const sendRequest = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/friendrequest`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senderId: currentUser?._id, recipientId: member._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successful connection created', data)
            }
        } catch (error) {
            console.error('Error sending connection request', error)
        }
    }

    const friendRequest = member.notifications?.some((notification) => {
        return notification.type === 'connection_request' &&
            notification.sender === currentUser?._id &&
            notification.recipient === member._id
    })

    return (
        <li className='flex my-1'>
            <Link to={`/connections/${member._id}`} className='flex items-center gap-x-2'>
                {member.image ? (
                    <img src={member.image} alt="" className='w-auto h-auto max-w-[35px] max-h-[35px] aspect-square rounded-full' />
                ) : (
                    <img src="/src/assets/placeholder.jpeg" alt="" className='w-auto h-auto max-w-[35px] max-h-[35px] aspect-square rounded-full' />
                )}

                <div>
                    {member.name}
                </div>
            </Link>

            {friendRequest ? (
                <div className='ml-auto text-amber-600'>
                    requested
                </div>
            ) : (
                <div className='ml-auto text-amber-600 cursor-pointer' onClick={sendRequest}>
                    connect
                </div>
            )}
        </li>
    )
}

export default NonMutualList