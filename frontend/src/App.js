// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import Analysis from './pages/Analysis';
import Login from './pages/Login';
import Register from './pages/Register';
import DataDisplay from './pages/DataDisplay';
import Profile from './pages/Profile'; // Import Profile
import ChangePassword from './pages/ChangePassword'; // Import ChangePassword
import {AuthProvider, useAuth} from './AuthContext';
import Navbar from './components/Navbar'; // Import Navbar

const PrivateRoute = ({element}) => {
    const {authToken} = useAuth();
    return authToken ? element : <Navigate to="/login"/>;
};

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<PrivateRoute element={<Home/>}/>}/>
        <Route path="/patients" element={<PrivateRoute element={<PatientList/>}/>}/>
        <Route path="/analysis/:id" element={<PrivateRoute element={<Analysis/>}/>}/>
        <Route path="/data-display" element={<PrivateRoute element={<DataDisplay/>}/>}/>
        <Route path="/profile" element={<PrivateRoute element={<Profile/>}/>}/>
        <Route path="/change-password" element={<PrivateRoute element={<ChangePassword/>}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar/>
                    <AppRoutes/>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;