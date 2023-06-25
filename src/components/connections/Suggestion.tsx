import { FC } from 'react'
import { AuthUserModel, UserModel } from '../../types/models'

interface SuggestionProps {
    user: UserModel
    currentUser: AuthUserModel | null
}

const Suggestion: FC<SuggestionProps> = ({ user, currentUser }) => {
    const handleConnect = async () => {
        try {
            const response = await fetch('http://localhost:4080/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1Id: currentUser?._id, user2Id: user._id })
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
        <li className='border border-zinc-900/10 shadow-sm rounded-lg my-5 p-3'>
            <div className='flex items-center gap-x-3'>
                <img src={user.image} alt="" className='w-auto h-auto max-w-[55px] max-h-[55px] aspect-square rounded-full' />
                <div className='flex flex-col'>
                    <div className='text-lg'>
                        {user.name}
                    </div>
                    <div className='font-light text-sm'>
                        {user.email}
                    </div>
                </div>
                <button className='ml-auto text-amber-600' onClick={handleConnect}>
                    Connect
                </button>
            </div>
        </li>
    )
}

export default Suggestion