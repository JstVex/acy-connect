import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllGroups from '../pages/AllGroups';
import Sidebar from '../components/Sidebar';
import JoinedGroups from '../pages/JoinedGroups';
import Connections from '../pages/Connections';
import Events from '../pages/Events';

function AppRouter() {
    return (
        <Router>
            <div className='flex'>
                <Sidebar />
                <Routes>
                    <Route path="/all-groups" element={<AllGroups props={'hi'} />} />
                    <Route path="/joined-groups" element={<JoinedGroups />} />
                    <Route path="connections" element={<Connections />} />
                    <Route path="events" element={<Events />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;