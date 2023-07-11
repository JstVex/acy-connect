import { FC } from 'react'
import clsx from 'clsx';
import { UserModel } from '../../types/models';

interface NotificationProps {
    notification: {
        _id: string;
        type: string;
        content: string;
        sender: string;
        recipient: string;
        group?: string;
        event?: string;
        status: 'unread' | 'read' | 'approved' | 'declined';
        createdAt: Date;
    };
    user: UserModel | null
}

const Notification: FC<NotificationProps> = ({ notification, user }) => {
    const markAsRead = async () => {
        const response = await fetch(`http://localhost:4080/users/notifications/markasread/${notification._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('successfully mark as read', data)
        }
    }

    const acceptRequest = async () => {
        try {
            const response = await fetch('http://localhost:4080/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1Id: notification.recipient, user2Id: notification.sender, notificationId: notification._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successful connection created', data)
            }
        } catch (error) {
            console.error('Error creating connection', error)
        }
    }

    const deleteNotification = async () => {
        try {
            const response = await fetch(`http://localhost:4080/users/notifications/${notification._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user?._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successfully deleted notification', data)
            }
        } catch (error) {
            console.error('Error creating connection', error)
        }
    }

    return (
        <li className={clsx('px-3 py-3 my-2 rounded-md shadow-sm flex items-center gap-x-3', notification.status === 'read' ? 'bg-gray-200/40 opacity-80 order-last' : 'bg-white')}>
            <div className='flex-1 text-gray-800'>
                {notification.content}
            </div>
            <button className='px-2 py-1 bg-blue-400 rounded-md' onClick={markAsRead}>
                Mark as read
            </button>
            <button className='px-2 py-1 bg-green-400 rounded-md' onClick={acceptRequest}>
                Accept
            </button>
            <button className='px-2 py-1 bg-red-400 rounded-md' onClick={deleteNotification}>
                Reject
            </button>
        </li>
    )
}

export default Notification