import { FC, useState } from 'react'
import Modal from '../ui/Modal'
import { Input } from '../ui/Input'
import { UserModel } from '../../types/models';
import ProfileInput from '../ui/ProfileInput';

interface SettingsModalProps {
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    user: UserModel | null
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, setIsOpen, onClose, user }) => {
    const [profile, setProfile] = useState({
        email: user?.email,
        name: user?.name,
        image: user?.image,
        bio: user?.bio,
        fblink: user?.facebookLink,
        hobbies: user?.hobbies,
        activeDay: user?.activeDay,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4080/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('successfully updates user data', data)
                // setIsOpen(false)
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Manage profile settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Customize your public information for others to see you
            </p>
            <form className='mt-6 flex flex-col gap-y-0' onSubmit={handleSubmit}>
                <ProfileInput
                    label="Name"
                    id="name"
                    disabled={false}
                    value={profile.name || ''}
                    setValue={setProfile}
                />
                <ProfileInput
                    label="Image"
                    id="image"
                    disabled={false}
                    value={profile.image || ''}
                    setValue={setProfile}
                />
                <ProfileInput
                    label="Bio"
                    id="bio"
                    disabled={false}
                    value={profile.bio || ''}
                    setValue={setProfile}
                    required
                />
                <ProfileInput
                    label="Hobbies"
                    id="hobbies"
                    disabled={false}
                    value={profile.hobbies || ''}
                    setValue={setProfile}
                />
                <ProfileInput
                    label="Active Day"
                    id="activeDay"
                    disabled={false}
                    value={profile.activeDay || ''}
                    setValue={setProfile}
                />
                <ProfileInput
                    label="Facebook link"
                    id="fblink"
                    disabled={false}
                    value={profile.fblink || ''}
                    setValue={setProfile}
                    required
                />
                <button type='submit' className='bg-amber-100 px-2 py-1.5 rounded-md mt-5 w-20'>
                    Confirm
                </button>
            </form>

        </Modal>
    )
}

export default SettingsModal