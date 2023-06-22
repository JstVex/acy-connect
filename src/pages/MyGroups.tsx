import { FC, useEffect, useState } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import { GroupModel } from '../types/models'

interface MyGroupsProps {
    props?: string
}

const MyGroups: FC<MyGroupsProps> = ({ props }) => {
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

        </div>
    )
}

export default MyGroups