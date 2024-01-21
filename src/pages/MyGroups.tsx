import { useEffect, useState } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import { GroupModel, UserModel } from '../types/models'
import Tabs from '../components/Tabs'
import Group from '../components/Group'
import Loading from '../components/Loading'

const MyGroups = () => {
    const [ownedGroups, setOwnedGroups] = useState<GroupModel[]>([]);
    const [joinedGroups, setJoinedGroups] = useState<GroupModel[]>([]);
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

    const [filteredOwnedGroups, setFilteredOwnedGroups] = useState<GroupModel[]>(ownedGroups);
    const [filteredJoinedGroups, setFilteredJoinedGroups] = useState<GroupModel[]>(joinedGroups);
    const [searchValue, setSearchValue] = useState('');

    const [activeTab, setActiveTab] = useState("Owned Groups");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const user = await response.json();
                setCurrentUser(user);

                const userGroups = user?.groups;
                const owned: GroupModel[] = [];
                const joined: GroupModel[] = [];

                userGroups?.forEach((group: GroupModel) => {
                    if (group.owner._id === user?._id) {
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

    if (ownedGroups === null || joinedGroups === null || currentUser === null) {
        return <Loading />
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <SearchBar setFiltered={setFilteredOwnedGroups} filterField={ownedGroups} setFiltered2={setFilteredJoinedGroups} filterField2={joinedGroups} setSearchValue={setSearchValue} filterBy={'title'} placeholder={'Search groups'} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} firstTitle='Owned Groups' secondTitle='Joined Groups'>
                {activeTab === 'Owned Groups' ? (
                    <>
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
                        <ul className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5'>
                            {(searchValue.trim() === '' ? ownedGroups : filteredOwnedGroups).map(ownedGroup => {
                                return <Group key={ownedGroup._id} group={ownedGroup} currentUser={currentUser} />
                            })}
                        </ul>
                    </>
                ) : (
                    <>
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
                        <ul className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5'>
                            {(searchValue.trim() === '' ? joinedGroups : filteredJoinedGroups).map(joinedGroup => {
                                return <Group key={joinedGroup._id} group={joinedGroup} currentUser={currentUser} />
                            })}
                        </ul>
                    </>
                )}
            </Tabs>
        </div>
    )
}

export default MyGroups