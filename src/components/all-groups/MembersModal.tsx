import { FC } from 'react'
import Modal from '../ui/Modal'
import { AuthUserModel, UserModel } from '../../types/models';
import MemberList from './MemberList';
import MutualList from './MutualList';
import NonMutualList from './NonMutualList';

interface MembersModalProps {
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    members: UserModel[];
    currentUser: UserModel | null;
    mutual: UserModel[];
}

const MembersModal: FC<MembersModalProps> = ({ isOpen, setIsOpen, onClose, members, currentUser, mutual }) => {
    const filteredMembers = members.filter((member) => member._id !== currentUser?._id);

    const mutuals = filteredMembers.filter((member) => mutual.some((m) => m._id === member._id));
    const nonMutuals = filteredMembers.filter((member) => !mutual.some((m) => m._id === member._id));

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className='text-2xl font-semibold leading-7 text-gray-900'>
                Members
            </h3>
            <h4 className='mt-4 my-0.5 text-lg font-semibold leading-7 text-gray-900'>
                Mutuals
            </h4>
            <ul className='mb-3'>
                {mutuals.map((member) => {
                    return <MutualList key={member._id} member={member} />
                })}
            </ul>
            <h4 className='mt-4 my-0.5 text-lg font-semibold leading-7 text-gray-900'>
                Other members
            </h4>
            <ul className='mb-3'>
                {nonMutuals.map((member) => {
                    return <NonMutualList key={member._id} member={member} currentUser={currentUser} />
                })}
            </ul>
        </Modal>
    )
}

export default MembersModal