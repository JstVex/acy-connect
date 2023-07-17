import { FC, useEffect, useState } from 'react'
import { UserModel } from '../types/models';
import Notification from '../components/notifications/Notification';
import Tabs from '../components/Tabs';

interface NotificationsProps {
    props?: any;
}

const Notifications: FC<NotificationsProps> = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [activeTab, setActiveTab] = useState("New Notifications");
    // const [notifications, setNotifications] = useState([])

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

    // if (user === null) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} firstTitle='New Notifications' secondTitle='Marked as read' >
                {activeTab === "New Notifications" ? (
                    user?.notifications?.map((noti) => {
                        return <Notification notification={noti} user={user} />
                    })

                ) : (
                    user?.notifications?.map((noti) => {
                        return <Notification notification={noti} user={user} />
                    })
                )}
            </Tabs>
            {/* <ul className='flex flex-col'>
                {user?.notifications?.map((noti) => {
                    return <Notification notification={noti} user={user} />
                })}
            </ul> */}
        </div>
    )
}

export default Notifications