import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
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
            <div className='mt-auto' onClick={handleLogout}>
                Profile
            </div>
        </nav>
    );
}

export default Sidebar
