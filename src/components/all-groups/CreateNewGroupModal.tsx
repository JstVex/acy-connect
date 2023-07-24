import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Modal from '../ui/Modal';
import { AuthUserModel } from '../../types/models';
import ProfileInput from '../ui/ProfileInput';

interface CreateNewGroupModalProps {
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    user: AuthUserModel | null
}

const CreateNewGroupModal: FC<CreateNewGroupModalProps> = ({ isOpen, setIsOpen, onClose, user }) => {
    const [group, setGroup] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        place: '',
        groupLink: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // const newValue = Array.isArray(value) ? value : [value];

        setGroup((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestBody = {
            owner: user?._id,
            title: group.title,
            description: group.description,
            date: group.date,
            time: group.time,
            place: group.place,
            groupLink: group.groupLink
        };

        try {
            const response = await fetch('http://localhost:4080/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                setIsOpen(false);
                console.log(data);

            } else {
                const errorData = await response.json();
                console.log(errorData.error);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Create a new group
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Can't find the group you want? Make your own one and let others join!
            </p>
            <form className='mt-3 flex flex-col gap-y-0' onSubmit={handleSubmit}>
                <ProfileInput
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    value={group.title}
                    onChange={handleInputChange}
                    placeholder='Title'
                />
                <ProfileInput
                    id='description'
                    name='description'
                    label='Description'
                    type='text'
                    value={group.description}
                    onChange={handleInputChange}
                    placeholder='Description'
                />
                <div className='flex items-center gap-x-4'>
                    <ProfileInput
                        id='date'
                        name='date'
                        label='Usual Day'
                        type='text'
                        value={group.date}
                        onChange={handleInputChange}
                        placeholder='Eg. Friday, Saturday'
                    />
                    <ProfileInput
                        id='time'
                        name='time'
                        label='Usual Time'
                        type='text'
                        value={group.time}
                        onChange={handleInputChange}
                        placeholder='Eg. 1 to 4'
                    />
                    <ProfileInput
                        id='place'
                        name='place'
                        label='Usual Place'
                        type='text'
                        value={group.place}
                        onChange={handleInputChange}
                        placeholder='Eg. cafereria'
                    />
                </div>
                <ProfileInput
                    id='groupLink'
                    name='groupLink'
                    label='Messenger/Telegram group link (optional)'
                    type='text'
                    value={group.groupLink}
                    onChange={handleInputChange}
                    placeholder=''
                />
                <button type='submit' className='ml-auto bg-amber-800 text-white px-2 py-1.5 rounded-md mt-5 w-20'>
                    Create
                </button>
            </form>
        </Modal>
    )
}

export default CreateNewGroupModal