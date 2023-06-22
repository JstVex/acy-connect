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
            <CreateNewGroupModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={user} />
            <button onClick={() => setIsOpen(true)}>
                Create a new group
            </button>
        </>

    )
}

export default CreateNewGroup