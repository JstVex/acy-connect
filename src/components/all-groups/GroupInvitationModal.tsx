import { FC } from 'react'
import Modal from '../ui/Modal';
import { GroupModel, UserModel } from '../../types/models';
import GroupInvite from './GroupInvite';

interface GroupInvitationModalProps {
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
    onClose: () => void;
    mutuals: UserModel[] | null;
    user: UserModel;
    currentGroup: GroupModel;
}

const GroupInvitationModal: FC<GroupInvitationModalProps> = ({ isOpen, onClose, mutuals, user, currentGroup }) => {
    const filteredMutuals = mutuals?.filter((mutual) => {
        const isCurrentUserUser1 = mutual.user1?._id === user._id;
        const isCurrentUserUser2 = mutual.user2?._id === user._id;

        if (isCurrentUserUser1) {
            return mutual.user2?.groups?.every((group) => group._id !== currentGroup._id)
        }

        if (isCurrentUserUser2) {
            return mutual.user1?.groups?.every((group) => group._id !== currentGroup._id);
        }

        return false;
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className='text-2xl font-semibold leading-7 text-gray-900'>
                Invite friends
            </h3>
            {filteredMutuals?.length === 0 && (
                <div className='mt-3 font-light'>
                    All of your friends are already in this group.
                </div>
            )}
            <ul className='mt-5 mb-3'>
                {filteredMutuals?.map((mutual) => {
                    return <GroupInvite key={mutual._id} mutual={mutual} user={user} group={currentGroup} />
                })}
            </ul>
        </Modal>
    )
}

export default GroupInvitationModal