import { Dispatch, FC, SetStateAction } from 'react'
import { EventModel, GroupModel, UserModel } from '../../types/models';
import { Search } from 'lucide-react';

interface ConnectionModel {
    connectedUser: UserModel,
    connectionId: string
}

interface SearchBarProps {
    setFiltered: Dispatch<SetStateAction<GroupModel[]>> | Dispatch<SetStateAction<UserModel[]>> | Dispatch<SetStateAction<EventModel[]>>;
    setFiltered2?: Dispatch<SetStateAction<ConnectionModel[]>> | Dispatch<SetStateAction<GroupModel[]>> | Dispatch<SetStateAction<EventModel[]>>;
    filterField: GroupModel[] | UserModel[] | EventModel[];
    filterField2?: ConnectionModel[] | GroupModel[] | EventModel[];
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
            if (setFiltered2)
                setFiltered2([]);
        } else {
            if (filterBy === 'title') {
                const filtered = (filterField as GroupModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                setFiltered(filtered as SetStateAction<GroupModel[]> & SetStateAction<UserModel[]> &
                    SetStateAction<EventModel[]>);
                if (setFiltered2) {
                    const filtered2 = (filterField2 as GroupModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                    setFiltered2(filtered2 as SetStateAction<GroupModel[]> &
                        SetStateAction<ConnectionModel[]> &
                        SetStateAction<EventModel[]>);
                }
            }

            if (filterBy === 'name') {
                const filtered = (filterField as UserModel[]).filter((field) => field.name.toLowerCase().includes(value.toLowerCase()));
                setFiltered(filtered as SetStateAction<GroupModel[]> & SetStateAction<UserModel[]> &
                    SetStateAction<EventModel[]>);
                if (setFiltered2) {
                    const filtered2 = (filterField2 as ConnectionModel[]).filter((field) => field.connectedUser.name.toLowerCase().includes(value.toLowerCase()));
                    setFiltered2(filtered2 as SetStateAction<GroupModel[]> &
                        SetStateAction<ConnectionModel[]> &
                        SetStateAction<EventModel[]>);
                }

            }

            if (filterBy === 'event title') {
                const filtered = (filterField as EventModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                setFiltered(filtered as SetStateAction<GroupModel[]> & SetStateAction<UserModel[]> &
                    SetStateAction<EventModel[]>);

                if (setFiltered2) {
                    const filtered2 = (filterField2 as EventModel[]).filter((field) => field.title.toLowerCase().includes(value.toLowerCase()));
                    setFiltered2(filtered2 as SetStateAction<GroupModel[]> &
                        SetStateAction<ConnectionModel[]> &
                        SetStateAction<EventModel[]>);
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
            <div className="flex items-center border border-gray-100 rounded-full py-2 px-3 w-full shadow-sm bg-white">
                <Search size={20} className='text-gray-600' />
                <input
                    type="text"
                    id="search"
                    autoComplete='off'
                    className="ml-2 flex-grow bg-transparent placeholder-zinc-600 focus:outline-none"
                    placeholder={placeholder}
                    onChange={handleSearchInputChange}
                />
            </div>
        </form>
    )
}

export default SearchBar