import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginForm';
import SignUpForm from './Pages/SignUpForm';
import PollsPage from './Pages/PollsPage';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Routes/ProtectedRoutes';
import AddEditPoll from './Pages/AddEditPoll';
import PublicRoute from './Routes/PublicRoute';
import NotFound from './Pages/NotFound';
import UserList from './Pages/UserList';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<SignUpForm />} />}
        />
        <Route
          path="/polls"
          element={<ProtectedRoute element={<PollsPage />} />}
        />
        <Route
          path="/addPoll"
          element={<ProtectedRoute element={<AddEditPoll />} redirectTo="/" adminOnly />}
        />
        <Route
          path="/editPoll/:id"
          element={<ProtectedRoute element={<AddEditPoll />} redirectTo="/" adminOnly />}
        />
           <Route
          path="/createUser"
          element={<ProtectedRoute Component={SignUpForm} redirectTo="/createUser" />}
        />
         <Route
          path="/users"
          element={<ProtectedRoute Component={UserList} redirectTo="/users" />}
        />

        <Route/>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
