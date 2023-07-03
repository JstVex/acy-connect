import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Modal from '../ui/Modal';
import ProfileInput from '../ui/ProfileInput';

interface CreateEventsModalProps {
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    groupId: string | undefined
}

interface Event {
    title: string;
    description: string;
    date: string;
    time: string;
}

const CreateEventsModal: FC<CreateEventsModalProps> = ({ isOpen, setIsOpen, onClose, groupId }) => {
    const [event, setEvent] = useState<Event>({
        title: '',
        description: '',
        date: '',
        time: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4080/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...event, group: groupId })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('successfully created an event', data)
                setIsOpen(false)
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Create a new event
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Create an event for a specific date
            </p>
            <form className='mt-5' onSubmit={handleSubmit}>
                <ProfileInput
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    value={event.title}
                    onChange={handleInputChange}
                    placeholder='Title'
                />
                <ProfileInput
                    id='description'
                    name='description'
                    label='Description'
                    type='text'
                    value={event.description}
                    onChange={handleInputChange}
                    placeholder='Description'
                />
                <ProfileInput
                    id='date'
                    name='date'
                    label='Date'
                    type='text'
                    value={event.date}
                    onChange={handleInputChange}
                    placeholder='Date'
                />
                <ProfileInput
                    id='time'
                    name='time'
                    label='Time'
                    type='text'
                    value={event.time}
                    onChange={handleInputChange}
                    placeholder='Time'
                />
                <button type='submit' className='bg-amber-100 px-2 py-1.5 rounded-md mt-5 w-20'>
                    Create
                </button>
            </form>
        </Modal>
    )
}

export default CreateEventsModal