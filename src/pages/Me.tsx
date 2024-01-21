import { FC, useEffect, useState, useContext } from 'react'
import { UserModel, GroupModel } from '../types/models'
import { Settings } from 'lucide-react'
import SettingsModal from '../components/me/SettingsModal'
// import Group from '../components/Group'
import { AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'

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
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
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
        return <Loading />;
    }

    console.log(user.groups)
    return (
        <>
            <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} user={user} />
            <div className='w-full max-h-screen overflow-y-auto p-3'>
                <div className='flex items-center gap-x-5'>
                    <div className='flex flex-1 items-center gap-x-5 bg-white rounded-3xl shadow-sm py-3 px-5 ring-1 ring-gray-200'>
                        {user.image ? (
                            <img src={user.image} alt="" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square object-cover rounded-full' />
                        ) : (
                            <img src="/src/assets/placeholder.jpeg" alt="" className='w-auto h-auto max-w-[100px] max-h-[100px] aspect-square object-cover rounded-full' />
                        )}

                        <div className='flex flex-col'>
                            <div className='text-2xl'>
                                {user.name}
                            </div>
                            <div className='font-light'>
                                {user.email}
                            </div>
                        </div>
                        <Settings onClick={() => setIsOpen(true)} className='ml-auto text-zinc-700' size={25} />
                    </div>
                    <button onClick={logout}>
                        Logout
                    </button>
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
        </>


    )
}

export default Me