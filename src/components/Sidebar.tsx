import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserModel } from '../types/models';
import clsx from 'clsx';
import { X, Menu } from 'lucide-react';
import useWindowWidth from '../hooks/useWindowWidth';

function Sidebar() {
    const [user, setUser] = useState<UserModel | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const windowWidth = useWindowWidth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const user = await response.json();

                if (response.ok) {
                    setUser(user);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUser();
    }, [])

    return (
        <div className={clsx('relative flex z-50')}>
            <nav className={clsx('h-screen shadow-sm shadow-amber-950 bg-amber-100 pt-3 flex flex-col', isOpen ? 'absolute sm:relative w-screen sm:w-60' : 'w-0', 'transition-all duration-300 ease-in-out')}>
                <h4 className={clsx('text-2xl px-3 text-amber-800 mb-5 font-semibold', isOpen ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-100 ease-in-out')}>
                    Acy Connect
                </h4>
                <ul className={clsx('flex flex-col text-lg px-3', isOpen ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-100 ease-in-out')}>
                    <li className="py-1 border-b-2 border-amber-800">
                        <Link to="/groups" onClick={() => {
                            if (windowWidth < 640) {
                                setIsOpen(false);
                            }
                        }}>
                            All Groups
                        </Link>
                    </li>
                    <li className="py-1 border-b-2 border-amber-800">
                        <Link to="/my-groups" onClick={() => {
                            if (windowWidth < 640) {
                                setIsOpen(false);
                            }
                        }}>
                            My Groups
                        </Link>
                    </li>
                    <li className="py-1 border-b-2 border-amber-800">
                        <Link to="/connections" onClick={() => {
                            if (windowWidth < 640) {
                                setIsOpen(false);
                            }
                        }}>
                            Connections
                        </Link>
                    </li>
                    <li className="py-1 border-b-2 border-amber-800">
                        <Link to="/events" onClick={() => {
                            if (windowWidth < 640) {
                                setIsOpen(false);
                            }
                        }}>
                            Events
                        </Link>
                    </li>
                    <li className="py-1">
                        <Link to="/notifications" onClick={() => {
                            if (windowWidth < 640) {
                                setIsOpen(false);
                            }
                        }}>
                            Notifications
                        </Link>
                    </li>
                </ul>

                <Link className={clsx('mt-auto flex items-center py-2 px-3 gap-x-3 bg-amber-900', isOpen ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-100 ease-in-out')} to="/me" onClick={() => {
                    if (windowWidth < 640) {
                        setIsOpen(false);
                    }
                }}>
                    {user?.image ? (
                        <img src={user?.image} alt="pfp" className='w-auto h-auto max-w-[48px] max-h-[48px] aspect-square object-cover rounded-full' />
                    ) : (
                        <img src="/src/assets/placeholder.jpeg" alt="placeholder" className='w-auto h-auto max-w-[48px] max-h-[48px] aspect-square object-cover rounded-full' />
                    )}
                    <div>
                        <div className='text-lg text-white'>
                            {user?.name}
                        </div>
                        <div className='text-xs font-light text-white'>
                            {user?.email}
                        </div>
                    </div>
                </Link>
                <button
                    className={clsx(
                        'absolute block sm:hidden shadow-sm shadow-amber-950 -translate-y-1/2 transform mt-auto p-1 rounded-full transition-all duration-300 ease-in-out',
                        'translate-x-full text-amber-100 bg-amber-800 right-10',
                        'top-5',
                        'z-10'
                    )}
                    onClick={toggleMenu}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </nav>
            <button
                className={clsx(
                    'absolute shadow-sm shadow-amber-950 -translate-y-1/2 transform mt-auto p-1 rounded-full transition-all duration-300 ease-in-out',
                    isOpen ? 'hidden sm:block' : 'hover:-right-1',
                    'translate-x-full text-amber-100 bg-amber-800 right-4',
                    'top-5',
                    'z-10'
                )}
                onClick={toggleMenu}
            >
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
    );
}

export default Sidebar
