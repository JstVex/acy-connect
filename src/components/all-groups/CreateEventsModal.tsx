import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Modal from '../ui/Modal';
import clsx from 'clsx';

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
                <div className="my-1">
                    <label htmlFor='title' className="block text-sm font-medium leading-6 text-zinc-900">
                        Title
                    </label>
                    <div className="mt-1">
                        <input
                            id='title'
                            name='title'
                            value={event.title}
                            onChange={handleInputChange}
                            placeholder='Title'
                            className={clsx("block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6")}
                        />
                    </div>
                </div>
                <div className="my-1">
                    <label htmlFor='description' className="block text-sm font-medium leading-6 text-zinc-900">
                        Description
                    </label>
                    <div className="mt-1">
                        <input
                            id='description'
                            name='description'
                            value={event.description}
                            onChange={handleInputChange}
                            placeholder='Description'
                            className={clsx("block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6")}
                        />
                    </div>
                </div>
                <div className="my-1">
                    <label htmlFor='date' className="block text-sm font-medium leading-6 text-zinc-900">
                        Date
                    </label>
                    <div className="mt-1">
                        <input
                            id='date'
                            name='date'
                            value={event.date}
                            onChange={handleInputChange}
                            placeholder='Date'
                            className={clsx("block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6")}
                        />
                    </div>
                </div>
                <div className="my-1">
                    <label htmlFor='time' className="block text-sm font-medium leading-6 text-zinc-900">
                        Time
                    </label>
                    <div className="mt-1">
                        <input
                            id='time'
                            name='time'
                            value={event.time}
                            onChange={handleInputChange}
                            placeholder='Time'
                            className={clsx("block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6")}
                        />
                    </div>
                </div>
                <button type='submit' className='bg-amber-100 px-2 py-1.5 rounded-md mt-5 w-20'>
                    Create
                </button>
            </form>
        </Modal>
    )
}

export default CreateEventsModal