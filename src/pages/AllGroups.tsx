import { FC, useEffect, useState, useContext } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import CreateNewGroup from '../components/all-groups/CreateNewGroup'
import Group from '../components/Group'
import { GroupModel } from '../types/models'
import { AuthContext } from '../context/AuthContext'

interface AllGroupsProps {
    props?: string
}

const AllGroups: FC<AllGroupsProps> = () => {
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<GroupModel[]>(groups);
    const [searchValue, setSearchValue] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch(`http://localhost:4080/groups/unjoined/${user?._id}`)
            const data = await response.json();

            if (response.ok) {
                setGroups(data)
                console.log('groups are', groups)
            }
        }

        fetchGroups();
    }, [user?._id])

    useEffect(() => {
        if (searchValue.trim() === '') {
            setFilteredGroups([]);
        }
    }, [searchValue]);

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