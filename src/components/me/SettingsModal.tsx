import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Modal from '../ui/Modal'
import { UserModel } from '../../types/models';
import ProfileInput from '../ui/ProfileInput';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    user: UserModel | null
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, setIsOpen, onClose, user }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: user?.email,
        name: user?.name,
        image: '',
        bio: user?.bio,
        fblink: user?.facebookLink,
        hobbies: user?.hobbies,
        activeDay: user?.activeDay,
    });

    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file);
        if (file) {
            setProfile((prevProfile: any) => ({
                ...prevProfile,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            Object.keys(profile).forEach((key) => {
                if (key !== 'image') {
                    formData.append(key, profile[key]);
                }
            });

            if (profile.image) {
                formData.append('image', profile.image);
            }

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
                method: 'PATCH',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('successfully updates user data', data)
                setIsOpen(false)
                navigate(0)
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
            <form className='mt-4 flex flex-col gap-y-0' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='max-h-[300px] sm:max-h-[100%] overflow-y-auto'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-x-6'>
                        <ProfileInput
                            id='name'
                            name='name'
                            label='Name'
                            type='text'
                            value={profile.name}
                            onChange={handleInputChange}
                            placeholder='Name'
                            className='order-last sm:order-first'
                        />
                        <div className='flex items-center gap-x-5'>
                            <div className='my-1 order-last sm:order-first'>
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-zinc-900">
                                    Profile Picture
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleImageChange}
                                        className="opacity-0 absolute top-0 right-0 cursor-pointer w-full h-full"
                                    />
                                    <label htmlFor="image" className="block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6">
                                        Choose Image
                                    </label>
                                </div>
                            </div>

                            {selectedImage ? (
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt=""
                                    className="w-auto h-auto max-w-[70px] max-h-[70px] aspect-square object-cover rounded-full"
                                />
                            ) : user?.image ? (
                                <img
                                    src={user.image}
                                    alt=""
                                    className="w-auto h-auto max-w-[75px] max-h-[75px] aspect-square object-cover rounded-full"
                                />
                            ) : (
                                <img
                                    src="/src/assets/placeholder.jpeg"
                                    alt=""
                                    className="w-auto h-auto max-w-[75px] max-h-[75px] aspect-square object-cover rounded-full"
                                />
                            )}
                        </div>
                    </div>
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
                        placeholder='Eg. Drawing, Reading'
                    />
                    <ProfileInput
                        id='activeDay'
                        name='activeDay'
                        label='Active Day at ACY'
                        type='text'
                        value={profile.activeDay}
                        onChange={handleInputChange}
                        placeholder='Eg. Wednesday, Friday'
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

                </div>
                <button type='submit' className='ml-auto bg-amber-800 text-white px-2 py-1.5 rounded-md mt-5 w-20'>
                    Confirm
                </button>
            </form>

        </Modal>
    )
}

export default SettingsModal