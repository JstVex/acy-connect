import { useEffect, useState } from 'react'
import { UserModel } from '../types/models';
import Notification from '../components/notifications/Notification';
import Tabs from '../components/Tabs';

interface NotificationsProps {
    _id: string;
    type: string;
    content: string;
    sender: string;
    recipient: string;
    group?: string;
    event?: string;
    status: 'unread' | 'read' | 'approved' | 'declined';
    createdAt: Date;
}

const Notifications = () => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [activeTab, setActiveTab] = useState("New Notifications");

    const [newNotifications, setNewNotifications] = useState<NotificationsProps[] | undefined>([]);
    const [markedAsReadNotifications, setMarkedAsReadNotifications] = useState<NotificationsProps[] | undefined>([]);

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
                    const newNotifications = user?.notifications?.filter((notification) => notification.status === 'unread')
                    setNewNotifications(newNotifications);
                    const markedAsReadNotifications = user?.notifications?.filter((notification) => notification.status === 'read')
                    setMarkedAsReadNotifications(markedAsReadNotifications)
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchCurrentUser();
    }, [user?.notifications])

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} firstTitle='New Notifications' secondTitle='Marked as read' >
                {activeTab === "New Notifications" ? (
                    <>
                        {newNotifications?.length === 0 && (
                            <div className='mt-3 my-10 font-light'>
                                There is no new notification currently.
                            </div>
                        )}
                        <ul className='flex flex-col divide-y divide-amber-300 mt-3'>
                            {newNotifications?.map((noti) => {
                                return <Notification notification={noti} user={user} />
                            })}
                        </ul>
                    </>
                ) : (
                    <>
                        {markedAsReadNotifications?.length === 0 && (
                            <div className='mt-3 my-10 font-light'>
                                No notifcation is marked as read.
                            </div>
                        )}
                        <ul className='flex flex-col divide-y divide-amber-300 mt-3'>
                            {markedAsReadNotifications?.map((noti) => {
                                return <Notification notification={noti} user={user} />
                            })}
                        </ul>
                    </>
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