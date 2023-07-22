import { FC } from 'react'
import { AuthUserModel, UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface SuggestionProps {
    user: UserModel
    currentUser: AuthUserModel | null
}

const Suggestion: FC<SuggestionProps> = ({ user, currentUser }) => {

    const sendRequest = async () => {
        try {
            const response = await fetch('http://localhost:4080/users/friendrequest', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senderId: currentUser?._id, recipientId: user._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successful connection created', data)
            }
        } catch (error) {
            console.error('Error sending connection request', error)
        }
    }

    // const handleConnect = async () => {
    //     try {
    //         const response = await fetch('http://localhost:4080/connections', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ user1Id: currentUser?._id, user2Id: user._id })
    //         })

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Successful connection created', data)
    //         }
    //     } catch (error) {
    //         console.error('Error creating connection', error)
    //     }
    // }

    const friendRequest = user.notifications?.some((notification) => {
        return notification.type === 'connection_request' &&
            notification.sender === currentUser?._id &&
            notification.recipient === user._id
    })

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
                    {friendRequest ? (
                        <button className='ml-auto text-amber-600'>
                            requested
                        </button>
                    ) : (
                        <button className='ml-auto text-amber-600 cursor-pointer' onClick={(e) => {
                            e.preventDefault();
                            sendRequest();
                        }}>
                            connect
                        </button>
                    )}
                </div>
            </li>
        </Link>
    )
}

export default Suggestion