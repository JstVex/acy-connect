import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from './ProtectRoutes';
import AllGroups from '../pages/AllGroups';
import Sidebar from '../components/Sidebar';
import MyGroups from '../pages/MyGroups';
import Connections from '../pages/Connections';
import Events from '../pages/Events';
import Signin from '../pages/Signin';
import Me from '../pages/Me';
import User from '../pages/User';
import GroupProfile from '../pages/GroupProfile';
import Notifications from '../pages/Notifications';

function AppRouter() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div className='flex gap-x-0 sm:gap-x-2 bg-amber-50 pr-0 sm:pr-2'>
                {user && <Sidebar />}
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <AllGroups />
                        </ProtectedRoute>}
                    />
                    <Route path="/my-groups" element={
                        <ProtectedRoute>
                            <MyGroups />
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
                    <Route path="/notifications" element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>}
                    />
                    <Route path="/me" element={
                        <ProtectedRoute>
                            <Me />
                        </ProtectedRoute>}
                    />
                    <Route path='/connections/:userId' element={
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    } />
                    <Route path='/groups/:groupId/*' element={
                        <ProtectedRoute>
                            <GroupProfile />
                        </ProtectedRoute>
                    } />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;