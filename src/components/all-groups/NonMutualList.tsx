import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface NonMutualListProps {
    member: UserModel
    currentUser: UserModel | null
}

const NonMutualList: FC<NonMutualListProps> = ({ member, currentUser }) => {
    const handleConnect = async () => {
        try {
            const response = await fetch('http://localhost:4080/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1Id: currentUser?._id, user2Id: member._id })
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Successful connection created', data)
            }
        } catch (error) {
            console.error('Error creating connection', error)
        }
    }
    return (
        <li className='flex'>
            <div>
                <Link to={`/connections/${member._id}`}>
                    {member.name}
                </Link>
            </div>
            <div className='ml-auto text-amber-600 cursor-pointer' onClick={handleConnect}>
                connect
            </div>
        </li>
    )
}

export default NonMutualList