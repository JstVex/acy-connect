import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GroupModel, UserModel } from '../types/models';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

interface ConnectionProps {
    _id: string,
    user1: UserModel,
    user2: UserModel,
    createdAt: Date
}

const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<UserModel | null>(null);

    const [connection, setConnection] = useState<ConnectionProps | null>(null);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userId}`);

                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const fetchConnection = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/connections/${userId}/${currentUser?._id}`);

                if (response.ok) {
                    const data = await response.json();
                    setConnection(data);
                    // console.log('connection between users is', connection)

                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUser();
        fetchConnection();
    }, [userId, currentUser?._id])

    useEffect(() => {
        console.log('connection between users is', connection)
    }, [connection])

    const sendRequest = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/friendrequest`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senderId: currentUser?._id, recipientId: userId })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successful connection created', data)
            }
        } catch (error) {
            console.error('Error sending connection request', error)
        }
    }

    const handleUnfriend = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/connections/${connection?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1Id: currentUser?._id, user2Id: userId })
            })

            if (response.ok) {
                const body = await response.json();
                console.log('Successfully unfriended', body)
            }

        } catch (error) {
            console.log('Failed to unfriend', error)
        }
    }

    if (user === null) {
        return <Loading />;
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3 ' >
            <div className='flex flex-1 items-center gap-x-5 bg-white rounded-3xl shadow-sm py-3 px-5 ring-1 ring-gray-200'>
                {user.image ? (
                    <img src={user.image} alt="profile" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square object-cover rounded-full' />
                ) : (
                    <img src="/src/assets/placeholder.jpeg" alt="placeholder" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square object-cover rounded-full' />
                )}

                <div className='flex flex-col'>
                    <div className='text-2xl'>
                        {user.name}
                    </div>
                    <div className='font-light'>
                        {user.email}
                    </div>
                </div>

                {connection === null ? (
                    <div className='ml-auto text-lg text-amber-600 cursor-pointer' onClick={sendRequest}>
                        Add friend
                    </div>
                ) : (
                    <div className='ml-auto text-lg text-amber-600' onClick={handleUnfriend}>
                        Unfriend
                    </div>
                )}
                {/* <Settings onClick={() => setIsOpen(true)} className='ml-auto text-zinc-700' size={28} /> */}
            </div>
            <div className='mt-5 bg-white rounded-3xl shadow-sm py-3 px-5 ring-1 ring-gray-200'>
                <div className='text-center text-2xl font-light text-amber-800 my-5'>
                    {user.bio && (
                        <div className='text-center text-xl font-light my-5'>
                            {user.bio}
                        </div>
                    )}
                </div>
                <div className='my-3 text-base'>
                    <span className='font-semibold'>Hobbies:</span> {user.hobbies}
                </div>
                <div className='my-3 text-base'>
                    <span className='font-semibold'>Usual active day at acy:</span> {user.activeDay}
                </div>
                <div className='my-3 text-base'>
                    <span className='font-semibold'>Currently a member of</span> {user.groups?.length} groups including
                    {user.groups?.map((group: GroupModel, index: number) => (
                        <span key={index} className='inline-block bg-gray-200 rounded-full px-3 py-1 mx-1 my-1'>
                            {group.title}
                        </span>
                    ))}
                </div>
                <div className='my-3 text-base'>
                    <span className='font-semibold'>Have made</span> {user.connections?.length} connections
                </div>
            </div>
        </div>
    )
}

export default User