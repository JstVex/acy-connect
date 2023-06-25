import { FC, useEffect, useState, useContext } from 'react'
import { UserModel, GroupModel } from '../types/models'
import { Settings } from 'lucide-react'
import SettingsModal from '../components/me/SettingsModal'
import Group from '../components/Group'
import { AuthContext } from '../context/AuthContext'

interface MeProps {
    props?: string
}

const Me: FC<MeProps> = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:4080/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });


                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchCurrentUser();
    }, [])

    if (user === null) {
        return <div>Loading...</div>;
    }

    console.log(user.groups)
    return (
        <>
            <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} user={user} />
            <div className='w-full max-h-screen overflow-y-auto p-3 ' >
                <div className='flex items-center gap-x-5'>
                    <img src={user.image} alt="" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square rounded-full' />
                    <div className='flex flex-col'>
                        <div className='text-2xl'>
                            {user.name}
                        </div>
                        <div className='font-light'>
                            {user.email}
                        </div>
                    </div>
                    <Settings onClick={() => setIsOpen(true)} className='ml-auto text-zinc-700' size={28} />
                </div>
                <div className='text-center text-xl font-light my-5'>
                    ~{user.bio}~
                </div>
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
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </>


    )
}

export default Me