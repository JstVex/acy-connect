import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserModel } from '../types/models';

function Sidebar() {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState<UserModel | null>(null)

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:4080/users/me', {
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
        <nav className='w-60 h-screen bg-amber-100 p-3 flex flex-col'>
            <h4 className='mb-5'>
                Acy Connect
            </h4>
            <ul className='flex flex-col divide-y-2 divide-amber-800'>
                <li>
                    <Link to="/groups">All Groups</Link>
                </li>
                <li>
                    <Link to="/my-groups">My Groups</Link>
                </li>
                <li>
                    <Link to="/connections">Connections</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
            </ul>
            <Link className='mt-auto flex items-center gap-x-3' to="/me">
                {user?.image ? (
                    <img src={user?.image} alt="pfp" className='w-auto h-auto max-w-[48px] max-h-[48px] aspect-square rounded-full' />
                ) : (
                    <img src="/src/assests/placeholder.jpeg" alt="placeholder" className='w-auto h-auto max-w-[48px] max-h-[48px] aspect-square rounded-full' />
                )}
                <div className='text-lg'>
                    {user?.name}
                </div>
            </Link>
        </nav>
    );
}

export default Sidebar
