import React from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import './styles/App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
