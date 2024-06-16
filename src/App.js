import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserLogged from './pages/UserLogged';
import CompanyLogged from './pages/CompanyLogged';
import FormUserInfoRegister from './pages/FormUserInfoRegister';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageCompany from './pages/ManageCompany';
import ManageUser from './pages/ManageUser';
import EditUser from './pages/EditUser';
import EditUserInfo from './pages/EditUserInfo';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userLogged/:userId" element={<UserLogged />} />
        <Route path="/companyLogged/:companyId" element={<CompanyLogged />} />
        <Route path="/formUserInfo/:userId" element={<FormUserInfoRegister />} />
        <Route path="/manageCompany/:companyId" element={<ManageCompany />} />
        <Route path="/manageUser/:userId/*" element={<ManageUser />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/editUserInfo/:userId" element={<EditUserInfo />} />
      </Routes>
    </div>
  );
};

export default App;
