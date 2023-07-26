import { FC } from 'react'
import clsx from 'clsx';
import { UserModel } from '../../types/models';
import { Trash2 } from 'lucide-react';

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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/notifications/markasread/${notification._id}`, {
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

    const acceptConnectionRequest = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/connections`, {
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

    const acceptGroupInvitation = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/groups/join`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: user?._id, id: notification.group })
            })

            if (response.ok) {
                const body = await response.json();
                console.log('Successfully joined the invited group', body)
            }

        } catch (error) {
            console.log('Failed to join the invited group', error)
        }
        deleteNotification();
    }

    const acceptEventNoti = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${notification.event}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user?._id })
            })

            if (response.ok) {
                const body = await response.json();
                console.log('Successfully joined the notified event', body)
            }
        } catch (error) {
            console.log('Failed to join the notified event', error)
        }
        deleteNotification();
    }

    const deleteNotification = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/notifications/${notification._id}`, {
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
        <li className='px-3 py-4 rounded-md flex items-center gap-x-3 hover:bg-amber-100/40 hover:shadow-sm '>
            <button className={clsx('w-3 h-3 border border-zinc-700', notification.status === 'read' && 'bg-blue-400')} onClick={markAsRead} />
            <div className='flex-1 text-gray-800'>
                {notification.content}
            </div>

            {notification.type === 'connection_request' && (
                <button className='text-amber-600' onClick={acceptConnectionRequest}>
                    Accept
                </button>
            )}
            {notification.type === 'group_invitation' && (
                <button className='text-amber-600' onClick={acceptGroupInvitation}>
                    Accept
                </button>
            )}
            {notification.type === 'event_notifying' && (
                <button className='text-amber-600' onClick={acceptEventNoti}>
                    Join
                </button>
            )}

            <Trash2 size={18} onClick={deleteNotification} className='ml-3 cursor-pointer' />
        </li>
    )
}

export default Notification