import { FC, useEffect, useState } from 'react'
import { UserModel } from '../types/models';
import Notification from '../components/notifications/Notification';

interface NotificationsProps {
    props?: any;
}

const Notifications: FC<NotificationsProps> = () => {
    const [user, setUser] = useState<UserModel | null>(null)
    const [notifications, setNotifications] = useState([])
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
                    console.log('user data is', data)
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
    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <h2 className='text-3xl font-semibold '>
                Notifications
            </h2>
            <ul className='flex flex-col'>
                {user.notifications?.map((noti) => {
                    return <Notification notification={noti} user={user} />
                })}
            </ul>
        </div>
    )
}

export default Notifications