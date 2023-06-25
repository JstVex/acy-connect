import { FC, useState, useContext, useEffect } from 'react'
import SearchBar from '../components/all-groups/SearchBar'
import { AuthContext } from '../context/AuthContext'
import { UserModel } from '../types/models'
import Suggestion from '../components/connections/Suggestion'
import Connection from '../components/connections/Connection'

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

    const { user } = useContext(AuthContext);
    const userId = user?._id;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // const response = await fetch(`http://localhost:4080/users/exceptcurrent?userId=${userId}`)
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
                    // console.log('connections', connections)
                }

            } catch (error) {
                console.log('error fetching connections', error)
            }
        }

        fetchUsers();
        fetchConnections();
    }, [userId])

    useEffect(() => {
        console.log('connections', connections);
    }, [connections]);

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            <SearchBar />
            <h3 className='text-xl mt-5'>
                Your connections
            </h3>
            <ul>
                {/* {connections?.connections?.map((connection) => {
                    return <Connection key={connection._id} user={connection} />
                })} */}
                {connections.map((connection) => {
                    return <Connection key={connection.connectionId} user={connection.connectedUser} />
                })}

            </ul>
            <h3 className='text-xl mt-5'>
                All available members
            </h3>
            <ul>
                {users.map((connectingUser) => {
                    return <Suggestion key={connectingUser._id} user={connectingUser} currentUser={user} />
                })}
            </ul>
        </div>
    )
}

export default Connections