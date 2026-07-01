import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/header/Menu';

// Pages publiques (visiteurs)
import Blogs from './components/public/Blogs';
import BlogDetails from './components/public/BlogDetails';

// Authentification
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Pages admin (protégées)
import RouteAdmin from './components/admin/RouteAdmin';
import Dashboard from './components/admin/Dashboard';
import CreateBlog from './components/admin/CreateBlog';
import BlogEdit from './components/admin/BlogEdit';
import AdminComments from './components/admin/AdminComments';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>

        {/* Pages publiques avec navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />

          {/* Pages admin, protégées par RouteAdmin */}
          <Route element={<RouteAdmin />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/comments" element={<AdminComments />} />
            <Route path="/admin/blogs/create" element={<CreateBlog />} />
            <Route path="/admin/blogs/edit/:id" element={<BlogEdit />} />
          </Route>
        </Route>

        {/* Pages sans navbar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
