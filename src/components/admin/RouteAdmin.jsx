import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../auth/auth';

// Protège les routes admin : redirige vers /login si non connecté.
// Utilisation dans App.jsx :
//   <Route element={<RouteAdmin />}>
//       <Route path="/admin" element={<Dashboard />} />
//   </Route>

const RouteAdmin = () => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default RouteAdmin;
