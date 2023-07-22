import { FC, useState, useContext, useEffect } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import { AuthContext } from '../context/AuthContext'
import { UserModel } from '../types/models'
import Suggestion from '../components/connections/Suggestion'
import Connection from '../components/connections/Connection'
import Tabs from '../components/Tabs'

interface ConnectionsProps {
    props?: string
}

interface ConnectionModel {
    connectedUser: UserModel,
    connectionId: string
}

const Connections: FC<ConnectionsProps> = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [connections, setConnections] = useState<ConnectionModel[]>([]);

    const [filteredUsers, setFilteredUsers] = useState<UserModel[]>(users);
    const [filteredConnections, setFilteredConnections] = useState<ConnectionModel[]>(connections);
    const [searchValue, setSearchValue] = useState('');

    const { user } = useContext(AuthContext);
    const userId = user?._id;

    const [activeTab, setActiveTab] = useState("Your connections");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:4080/users/notconnect?userId=${userId}`)

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data)
                }

            } catch (error) {
                console.log('error fetching users', error)
            }
        }

        const fetchConnections = async () => {
            try {
                const response = await fetch(`http://localhost:4080/connections/foruser/${userId}`);

                if (response.ok) {
                    const data = await response.json();
                    setConnections(data)
                }

            } catch (error) {
                console.log('error fetching connections', error)
            }
        }

        fetchUsers();
        fetchConnections();
    }, [userId])

    useEffect(() => {
        if (searchValue.trim() === '') {
            setFilteredUsers([]);
            setFilteredConnections([]);
        }
    }, [searchValue]);

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <SearchBar setFiltered={setFilteredUsers} filterField={users} setFiltered2={setFilteredConnections} filterField2={connections} setSearchValue={setSearchValue} filterBy={'name'} placeholder={'Search connections'} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} firstTitle='Your connections' secondTitle='Other users'>
                {activeTab === 'Your connections' ? (
                    <>
                        {searchValue.trim() !== '' && filteredConnections.length === 0 && (
                            <p className='text-lg mt-3 text-gray-500'>
                                There is no user with the name you are searching for.
                            </p>
                        )}
                        <ul className='flex flex-col divide-y divide-amber-300 mt-3'>
                            {(searchValue.trim() === '' ? connections : filteredConnections).map(connection => {
                                return <Connection key={connection.connectionId} user={connection.connectedUser} />
                            })}
                        </ul>
                    </>

                ) : (
                    <>
                        {searchValue.trim() !== '' && filteredUsers.length === 0 && (
                            <p className='text-lg mt-3 text-gray-500'>
                                There is no user with the name you are searching for.
                            </p>
                        )}
                        <ul className='flex flex-col divide-y divide-amber-300 mt-3'>
                            {(searchValue.trim() === '' ? users : filteredUsers).map(connectingUser => {
                                return <Suggestion key={connectingUser._id} user={connectingUser} currentUser={user} />
                            })}
                        </ul>
                    </>
                )}
            </Tabs>
            {/* <h3 className='text-xl mt-5'>
                Your connections
            </h3>
            {searchValue.trim() !== '' && filteredConnections.length === 0 && (
                <p className='text-lg mt-3 text-gray-500'>There is no user with the name you are searching for.</p>
            )}
            <ul>
                {(searchValue.trim() === '' ? connections : filteredConnections).map(connection => {
                    return <Connection key={connection.connectionId} user={connection.connectedUser} />
                })}
            </ul>
            <h3 className='text-xl mt-5'>
                All available members
            </h3>
            {searchValue.trim() !== '' && filteredUsers.length === 0 && (
                <p className='text-lg mt-3 text-gray-500'>There is no user with the name you are searching for.</p>
            )}
            <ul>
                {(searchValue.trim() === '' ? users : filteredUsers).map(connectingUser => {
                    return <Suggestion key={connectingUser._id} user={connectingUser} currentUser={user} />
                })}
            </ul> */}
        </div>
    )
}

export default Connections