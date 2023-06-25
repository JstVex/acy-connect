import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GroupModel, UserModel } from '../types/models';

interface UserProps {
    props?: string
}

const User: FC<UserProps> = () => {
    const { userId } = useParams();
    console.log('userId is', userId)
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:4080/users/${userId}`);

                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUser()
    }, [userId])

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3 ' >
            <div className='flex items-center gap-x-5'>
                {user.image ? (
                    <img src={user.image} alt="profile" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square rounded-full' />
                ) : (
                    <img src="/src/assets/placeholder.jpeg" alt="placeholder" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square rounded-full' />
                )}

                <div className='flex flex-col'>
                    <div className='text-2xl'>
                        {user.name}
                    </div>
                    <div className='font-light'>
                        {user.email}
                    </div>
                </div>
                {/* <Settings onClick={() => setIsOpen(true)} className='ml-auto text-zinc-700' size={28} /> */}
            </div>
            {user.bio && (
                <div className='text-center text-xl font-light my-5'>
                    ~{user.bio}~
                </div>
            )}

            <div className='my-3 text-lg'>
                Hobbies: {user.hobbies}
            </div>
            <div className='my-3 text-lg'>
                Usual active day at acy: {user.activeDay}
            </div>
            <div className='my-3 text-lg'>
                Currently a member of {user.groups?.length} groups including {user.groups?.map((group: GroupModel) => {
                    console.log(group)
                    return (
                        <span className=''>
                            {group.title}, <span> </span>
                        </span>
                    )
                })}
            </div>
            <div className='my-3 text-lg'>
                Have made {user.connections?.length} connections
            </div>
        </div>
    )
}

export default User