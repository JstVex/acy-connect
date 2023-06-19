import { FC, useEffect, useState } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import CreateNewGroup from '../components/all-groups/CreateNewGroup'
import Group from '../components/Group'

interface AllGroupsProps {
    props?: string
}

const AllGroups: FC<AllGroupsProps> = ({ props }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('http://localhost:4080/groups')
            const data = await response.json();

            if (response.ok) {
                setGroups(data)
            }
        }

        fetchGroups()
    }, [groups])

    return (
        <div className='w-full p-3'>
            <div className='flex gap-x-4'>
                <SearchBar />
                <CreateNewGroup />
            </div>
            <ul>
                {groups.map((group) => {
                    return <Group group={group} />
                })}
            </ul>
        </div>
    )
}

export default AllGroups