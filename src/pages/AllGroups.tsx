import { useEffect, useState, useContext } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import CreateNewGroup from '../components/all-groups/CreateNewGroup'
import Group from '../components/Group'
import { GroupModel } from '../types/models'
import { AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'

const AllGroups = () => {
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<GroupModel[]>(groups);
    const [searchValue, setSearchValue] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/groups/unjoined/${user?._id}`)
            const data = await response.json();

            if (response.ok) {
                setGroups(data)
            }
        }

        fetchGroups();
    }, [user?._id])

    useEffect(() => {
        if (searchValue.trim() === '') {
            setFilteredGroups([]);
        }
    }, [searchValue]);

    if (user === null || groups.length === 0) {
        return <Loading />;
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <div className='flex gap-x-4'>
                <SearchBar setFiltered={setFilteredGroups} filterField={groups} setSearchValue={setSearchValue} filterBy={'title'} placeholder={'Search groups'} />
                <CreateNewGroup user={user} />
            </div>
            {searchValue.trim() !== '' && filteredGroups.length === 0 && (
                <p className='text-lg mt-3 text-gray-500'>There is no group with the title you are searching for.</p>
            )}
            <ul className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5'>
                {(searchValue.trim() === '' ? groups : filteredGroups).map(group => {
                    return <Group key={group._id} group={group} currentUser={user} />
                })}
            </ul>
        </div>
    )
}

export default AllGroups