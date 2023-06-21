import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from './ProtectRoutes';
import AllGroups from '../pages/AllGroups';
import Sidebar from '../components/Sidebar';
import JoinedGroups from '../pages/JoinedGroups';
import Connections from '../pages/Connections';
import Events from '../pages/Events';
import Signin from '../pages/Signin';

function AppRouter() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div className='flex'>
                {user && <Sidebar />}
                <Routes>
                    <Route path="/all-groups" element={
                        <ProtectedRoute>
                            <AllGroups />
                        </ProtectedRoute>}
                    />
                    <Route path="/joined-groups" element={
                        <ProtectedRoute>
                            <JoinedGroups />
                        </ProtectedRoute>}
                    />
                    <Route path="/connections" element={
                        <ProtectedRoute>
                            <Connections />
                        </ProtectedRoute>}
                    />
                    <Route path="/events" element={
                        <ProtectedRoute>
                            <Events />
                        </ProtectedRoute>}
                    />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;