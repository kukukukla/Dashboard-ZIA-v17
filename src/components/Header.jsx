import React from 'react';
import '../styles/Header.css';

function Header({ onLogout, userName }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">ProjetoZeta</h1>
        <nav className="nav-menu" aria-label="Principal">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#analytics">Analytics</a></li>
            <li><a href="#reports">Relatórios</a></li>
            <li><a href="#settings">Configurações</a></li>
          </ul>
        </nav>
        <div className="header-user-panel">
          <span className="header-user">Olá, {userName}</span>
          <button type="button" className="logout-button" onClick={onLogout}>Sair</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
