import clsx from 'clsx';
import { FC } from 'react'

interface ProfileInputProps {
    id: string;
    name: string;
    value: string | undefined;
    label: string;
    type: string;
    onChange: any;
    placeholder: string
}

const ProfileInput: FC<ProfileInputProps> = ({ id, name, label, type, value, onChange, placeholder }) => {
    return (
        <div className="my-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-zinc-900">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={clsx(" block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6")}
                />
            </div>
        </div>
    );
};

export default ProfileInput