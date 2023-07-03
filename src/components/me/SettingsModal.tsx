import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Modal from '../ui/Modal'
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4080/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ profile: profile })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('successfully updates user data', data)
                setIsOpen(false)
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
                    id='name'
                    name='name'
                    label='Name'
                    type='text'
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder='Name'
                />
                <ProfileInput
                    id='image'
                    name='image'
                    label='Image'
                    type='text'
                    value={profile.image}
                    onChange={handleInputChange}
                    placeholder='Image'
                />
                <ProfileInput
                    id='bio'
                    name='bio'
                    label='Bio'
                    type='text'
                    value={profile.bio}
                    onChange={handleInputChange}
                    placeholder='Bio'
                />
                <ProfileInput
                    id='hobbies'
                    name='hobbies'
                    label='Hobbies'
                    type='text'
                    value={profile.hobbies}
                    onChange={handleInputChange}
                    placeholder='Hobbies'
                />
                <ProfileInput
                    id='activeDay'
                    name='activeDay'
                    label='Active Day at ACY'
                    type='text'
                    value={profile.activeDay}
                    onChange={handleInputChange}
                    placeholder='Active day'
                />
                <ProfileInput
                    id='fblink'
                    name='fblink'
                    label='Facebook Link'
                    type='text'
                    value={profile.fblink}
                    onChange={handleInputChange}
                    placeholder='Facebook link'
                />
                <button type='submit' className='bg-amber-100 px-2 py-1.5 rounded-md mt-5 w-20'>
                    Confirm
                </button>
            </form>

        </Modal>
    )
}

export default SettingsModal