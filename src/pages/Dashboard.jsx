import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ExchangeMenu from '../components/ExchangeMenu';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
  const { logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setData([
          { id: 1, title: 'Métrica 1', value: 100 },
          { id: 2, title: 'Métrica 2', value: 200 },
          { id: 3, title: 'Métrica 3', value: 150 }
        ]);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Header onLogout={logout} userName={user?.name || user?.email || 'Usuário'} />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <MainContent data={data} isLoading={isLoading} />
          <ExchangeMenu />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
