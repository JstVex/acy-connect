// import React, { useContext } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// interface ProtectedRouteProps {
//     path: string,
//     element: React.ReactElement;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element, ...rest }) => {
//     const { user } = useContext(AuthContext);

//     return <Routes>
//         {user ? (

//             <Route {...rest} path={path} element={element} />
//         ) : (
//             <Navigate to="/login" replace />
//         )
//         }
//     </Routes>
// };

// export default ProtectedRoute;
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/signin" replace />
    }
    return children
};

export default ProtectedRoute;
