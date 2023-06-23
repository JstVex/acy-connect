import clsx from 'clsx';
import { FC } from 'react'

interface ProfileInputProps {
    label: string;
    id: string;
    value: string | undefined;
    setValue: any;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const ProfileInput: FC<ProfileInputProps> = ({ label, id, type, value, setValue, disabled, placeholder }) => {
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue({ ...value, [id]: e.target.value });
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prevProfile: any) => ({
            ...prevProfile,
            [id]: e.target.value,
        }));
    };

    return (
        <div className="my-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-zinc-900">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    value={value || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={clsx(" block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 ", disabled && "opacity-50 cursor-default")}
                />
            </div>
        </div>
    );
};

export default ProfileInput