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

    const [filteredOwnedGroups, setFilteredOwnedGroups] = useState<GroupModel[]>(ownedGroups);
    const [filteredJoinedGroups, setFilteredJoinedGroups] = useState<GroupModel[]>(joinedGroups);
    const [searchValue, setSearchValue] = useState('');

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

    useEffect(() => {
        if (searchValue.trim() === '') {
            setFilteredOwnedGroups([]);
            setFilteredJoinedGroups([]);
        }
    }, [searchValue]);

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <SearchBar setFiltered={setFilteredOwnedGroups} filterField={ownedGroups} setFiltered2={setFilteredJoinedGroups} filterField2={joinedGroups} setSearchValue={setSearchValue} filterBy={'title'} placeholder={'Search groups'} />
            <h3 className='text-xl mt-5'>
                Owned Groups
            </h3>
            {searchValue.trim() !== '' && filteredOwnedGroups.length === 0 && (
                <p className='text-lg mt-3 text-gray-500'>
                    There is no group with the title you are searching for.
                </p>
            )}
            {ownedGroups.length === 0 && searchValue.trim() === '' && (
                <div className='mt-3 my-10 font-light'>
                    You haven't created any group yet.
                </div>
            )}
            <ul>
                {(searchValue.trim() === '' ? ownedGroups : filteredOwnedGroups).map(ownedGroup => {
                    return <OwnedGroup key={ownedGroup._id} group={ownedGroup} />
                })}
            </ul>
            <h3 className='text-xl mt-5'>
                Joined Groups
            </h3>
            {searchValue.trim() !== '' && filteredJoinedGroups.length === 0 && (
                <p className='text-lg mt-3 text-gray-500'>
                    There is no group with the title you are searching for.
                </p>
            )}
            {joinedGroups.length === 0 && searchValue.trim() === '' && (
                <div className='mt-3 my-10 font-light'>
                    You haven't joined any group yet.
                </div>
            )}
            <ul>
                {(searchValue.trim() === '' ? joinedGroups : filteredJoinedGroups).map(joinedGroup => {
                    return <JoinedGroup key={joinedGroup._id} group={joinedGroup} />
                })}
            </ul>
        </div>
    )
}

export default MyGroups