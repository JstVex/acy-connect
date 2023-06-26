import { FC, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GroupModel, UserModel } from '../types/models'
import { Link } from 'react-router-dom'
import MembersModal from '../components/all-groups/MembersModal'
import { AuthContext } from '../context/AuthContext'

interface GroupProfileProps {
    props?: string
}

const GroupProfile: FC<GroupProfileProps> = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<GroupModel | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<UserModel | null>(null);
    const [mutualFriends, setMutualFriends] = useState<UserModel[]>([]);

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

        const fetchGroup = async () => {
            try {
                const response = await fetch(`http://localhost:4080/groups/${groupId}`);

                if (response.ok) {
                    const data = await response.json();
                    setGroup(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const fetchMutualFriends = async () => {
            try {
                const response = await fetch(`http://localhost:4080/users/mutualfriends/${user?._id}/${groupId}`);

                if (response.ok) {
                    const data = await response.json();
                    setMutualFriends(data);
                }

            } catch (error) {
                console.log('Error fetching mutual friends', error);
            }
        };

        fetchCurrentUser();
        fetchGroup();
        fetchMutualFriends();
    }, [groupId, user?._id])

    // useEffect(() => {
    //     console.log('user connections', user?.connections)
    //     console.log('group:', group)
    // }, [group, user?.connections])

    if (group === null || user === null) {
        return <div>Loading...</div>;
    }

    // console.log('user is', user)
    // const userConnections = user.connections.map((connection) => connection.toString());
    // console.log('userconnections', userConnections)
    // const groupMembers = group.members.map(member => member._id.toString());
    // console.log('groupmembers', groupMembers)
    // const mutualFriends = groupMembers.filter(memberId => userConnections.includes(memberId));

    // console.log('mutual friends', mutualFriends)

    return (
        <>
            <MembersModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} members={group.members} currentUser={user} mutual={mutualFriends} />
            <div className='w-full max-h-screen overflow-y-auto p-3'>
                <div className='flex items-center'>
                    <h3 className='text-3xl capitalize'>
                        {group.title}
                    </h3>
                    <Link to={`/connections/${group.owner._id}`} className='ml-auto text-lg'>
                        Owned by: <span className='capitalize'>{group.owner.name}</span>
                    </Link>
                </div>
                <p className='text-xl font-light my-3'>
                    {group.description}
                </p>
                <div className=''>
                    Usual meeting day: {group.date}
                </div>
                <div className=''>
                    Usual active time: {group.time}
                </div>
                <div className=''>
                    Usual meeting spot: {group.place}
                </div>
                <div className='my-5' onClick={() => setIsOpen(true)}>
                    {group.members.length} total members including {mutualFriends.length} mutuals
                </div>

            </div>
        </>
    )
}

export default GroupProfile