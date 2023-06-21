import { FC, useState } from 'react'
import CreateNewGroupModal from './CreateNewGroupModal'

interface CreateNewGroupProps {
    props?: string
}

const CreateNewGroup: FC<CreateNewGroupProps> = ({ props }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <CreateNewGroupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button onClick={() => setIsOpen(true)}>
                Create a new group
            </button>
        </>

    )
}

export default CreateNewGroup