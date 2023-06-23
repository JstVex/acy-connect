import { FC, useEffect, useState } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import { GroupModel } from '../types/models'
import OwnedGroup from '../components/my-groups/OwnedGroup'
import JoinedGroup from '../components/my-groups/JoinedGroup'

interface MyGroupsProps {
    props?: string
}

const MyGroups: FC<MyGroupsProps> = () => {
    const [ownedGroups, setOwnedGroups] = useState<GroupModel[]>([]);
    const [joinedGroups, setJoinedGroups] = useState<GroupModel[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:4080/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const user = await response.json();

                const userGroups = user?.groups;
                const owned: GroupModel[] = [];
                const joined: GroupModel[] = [];

                userGroups?.forEach((group: GroupModel) => {
                    if (group.owner === user?._id) {
                        owned.push(group);
                    } else {
                        joined.push(group);
                    }
                    console.log('owner is', group.owner)
                });

                setOwnedGroups(owned);
                setJoinedGroups(joined);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUser();
    }, [])

    console.log('owned groups', ownedGroups);
    console.log('joined groups', joinedGroups)

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <SearchBar />
            <h3 className='text-xl mt-5'>
                Owned Groups
            </h3>
            {ownedGroups.length === 0 && (
                <div className='mt-3 my-10 font-light'>You haven't created any group yet.</div>
            )}
            <ul>
                {ownedGroups.map((ownedGroup) => {
                    return <OwnedGroup key={ownedGroup._id} group={ownedGroup} />
                })}
            </ul>
            <h3 className='text-xl mt-5'>
                Joined Groups
            </h3>
            {joinedGroups.length === 0 && (
                <div className='mt-3 my-10 font-light'>You haven't joined any group yet.</div>
            )}
            <ul>
                {joinedGroups.map((joinedGroup) => {
                    return <JoinedGroup key={joinedGroup._id} group={joinedGroup} />
                })}
            </ul>
        </div>
    )
}

export default MyGroups