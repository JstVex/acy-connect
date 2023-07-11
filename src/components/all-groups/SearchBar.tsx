import { Dispatch, FC, SetStateAction } from 'react'
import { GroupModel, UserModel } from '../../types/models';
import { Search } from 'lucide-react';

interface ConnectionModel {
    connectedUser: UserModel,
    connectionId: string
}

interface SearchBarProps {
    setFiltered: Dispatch<SetStateAction<GroupModel[]>> | Dispatch<SetStateAction<UserModel[]>>;
    setFiltered2?: Dispatch<SetStateAction<ConnectionModel[]>> | Dispatch<SetStateAction<GroupModel[]>>;
    filterField: GroupModel[] | UserModel[];
    filterField2?: ConnectionModel[] | GroupModel[];
    setSearchValue: Dispatch<SetStateAction<string>>;
    filterBy: string;
    placeholder: string;
}

const SearchBar: FC<SearchBarProps> = ({ setFiltered, setFiltered2, filterField, filterField2, setSearchValue, filterBy, placeholder }) => {
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchValue(value);

        if (value.trim() === '') {
            setFiltered([]);
        } else {
            if (filterBy === 'title') {
                const filtered = (filterField as GroupModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                setFiltered(filtered as SetStateAction<GroupModel[]> & SetStateAction<UserModel[]>);
                if (setFiltered2) {
                    const filtered2 = (filterField2 as GroupModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                    setFiltered2(filtered2 as SetStateAction<GroupModel[]> &
                        SetStateAction<ConnectionModel[]>);
                }
            }

            if (filterBy === 'name') {
                const filtered = (filterField as UserModel[]).filter((field) => field.name.toLowerCase().includes(value.toLowerCase()));
                setFiltered(filtered as SetStateAction<GroupModel[]> & SetStateAction<UserModel[]>);
                if (setFiltered2) {
                    const filtered2 = (filterField2 as ConnectionModel[]).filter((field) => field.connectedUser.name.toLowerCase().includes(value.toLowerCase()));
                    setFiltered2(filtered2 as SetStateAction<GroupModel[]> &
                        SetStateAction<ConnectionModel[]>);
                }

            }

        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form className="flex-grow" onSubmit={handleFormSubmit}>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="flex items-center border border-zinc-900 rounded-full py-2 px-3 w-full">
                <Search size={20} className='text-gray-600' />
                <input
                    type="text"
                    id="search"
                    className="ml-2 flex-grow bg-transparent placeholder-zinc-600 focus:outline-none"
                    placeholder={placeholder}
                    onChange={handleSearchInputChange}
                />
            </div>
        </form>
    )
}

export default SearchBar