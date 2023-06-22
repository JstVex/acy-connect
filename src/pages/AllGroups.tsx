import { FC, useEffect, useState, useContext } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import CreateNewGroup from '../components/all-groups/CreateNewGroup'
import Group from '../components/Group'
import { GroupModel } from '../types/models'
import { UserModel } from '../types/models'
import { AuthContext } from '../context/AuthContext'

interface AllGroupsProps {
    props?: string
}

const AllGroups: FC<AllGroupsProps> = () => {
    const [groups, setGroups] = useState<GroupModel[] | null>(null);
    const [users, setUsers] = useState<UserModel[]>([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('http://localhost:4080/groups')
            const data = await response.json();

            if (response.ok) {
                setGroups(data)
            }
        }

        // const fetchUsers = async () => {
        //     const response = await fetch('http://localhost:4080/users')
        //     const data = await response.json();

        //     if (response.ok) {
        //         setUsers(data)
        //     }
        // }

        fetchGroups();
        // fetchUsers();
    }, [groups, users])

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <div className='flex gap-x-4'>
                <SearchBar />
                <CreateNewGroup user={user} />
            </div>
            <ul>
                {groups?.map((group) => {
                    return <Group key={group._id} group={group} users={users} currentUser={user} />
                })}
            </ul>
        </div>
    )
}

export default AllGroups