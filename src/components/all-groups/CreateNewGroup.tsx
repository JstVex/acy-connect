import { FC, useState } from 'react'
import CreateNewGroupModal from './CreateNewGroupModal'
import { AuthUserModel } from '../../types/models'

interface CreateNewGroupProps {
    user: AuthUserModel | null
}

const CreateNewGroup: FC<CreateNewGroupProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <CreateNewGroupModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} user={user} />
            <button onClick={() => setIsOpen(true)} className='w-20 sm:w-auto'>
                Create a new group
            </button>
        </>

    )
}

export default CreateNewGroup