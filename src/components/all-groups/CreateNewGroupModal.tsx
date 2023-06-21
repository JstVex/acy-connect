import { FC, useState, useContext } from 'react'
import Modal from '../ui/Modal'
import { Input } from '../ui/Input'
import { AuthContext } from '../../context/AuthContext'

interface CreateNewGroupModalProps {
    isOpen?: boolean,
    onClose: () => void,
}

const CreateNewGroupModal: FC<CreateNewGroupModalProps> = ({ isOpen, onClose }) => {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');
    const [groupLink, setGroupLink] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const requestBody = {
            owner: user?._id,
            title,
            description,
            date,
            time,
            place,
            groupLink
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
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Create a new group
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Can't find the group you want? Make your own one and let others join!
            </p>
            <form className='mt-6 flex flex-col gap-y-0' onSubmit={handleSubmit}>
                <Input
                    label="Title"
                    id="title"
                    disabled={false}
                    value={title}
                    setValue={setTitle}
                    required
                />
                <Input
                    label="Description"
                    id="description"
                    disabled={false}
                    value={description}
                    setValue={setDescription}
                    required
                />
                <div className='flex items-center gap-x-4'>
                    <Input
                        label="Usual date"
                        id="date"
                        disabled={false}
                        value={date}
                        setValue={setDate}
                        placeholder='E.g- Tues & Thurs'
                        required
                    />
                    <Input
                        label="Usual time"
                        id="time"
                        disabled={false}
                        value={time}
                        setValue={setTime}
                        placeholder='E.g- 10 to 2:30'
                    />
                    <Input
                        label="Usual meetup spot"
                        id="place"
                        disabled={false}
                        value={place}
                        setValue={setPlace}
                        placeholder='E.g- cafetaria'
                    />
                </div>
                <Input
                    label="Messenger/Telegram group link (optional)"
                    id="grouplink"
                    disabled={false}
                    value={groupLink}
                    setValue={setGroupLink}
                />
                <button type='submit' className='bg-amber-100 px-2 py-1.5 rounded-md mt-5 w-20'>
                    Create
                </button>
            </form>

        </Modal>
    )
}

export default CreateNewGroupModal