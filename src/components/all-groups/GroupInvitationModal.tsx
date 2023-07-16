import { FC } from 'react'
import Modal from '../ui/Modal';
import { GroupModel, UserModel } from '../../types/models';
import GroupInvite from './GroupInvite';

interface GroupInvitationModalProps {
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
    onClose: () => void;
    mutuals: UserModel[] | any[] | undefined;
    user: UserModel;
    currentGroup: GroupModel;
}

const GroupInvitationModal: FC<GroupInvitationModalProps> = ({ isOpen, onClose, mutuals, user, currentGroup }) => {
    const filteredMutuals = mutuals?.filter((mutual) => mutual.user1.groups?.every((group: any) => group !== currentGroup._id));

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className='text-2xl font-semibold leading-7 text-gray-900'>
                Invite friends
            </h3>
            <ul className='mt-5 mb-3'>
                {filteredMutuals?.map((mutual) => {
                    return <GroupInvite key={mutual._id} mutual={mutual} user={user} group={currentGroup} />
                })}
            </ul>

        </Modal>
    )
}

export default GroupInvitationModal