import React, { useState, useEffect } from 'react';
import { exchangeService } from '../services/exchangeService';
import '../styles/ExchangeMenu.css';

function ExchangeMenu() {
    const [exchanges, setExchanges] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadExchanges();
    }, []);

    const loadExchanges = async () => {
        try {
            const data = await exchangeService.getConnectedExchanges();
            setExchanges(data.exchanges || []);
        } catch (err) {
            console.error('Erro ao carregar exchanges:', err);
        }
    };

    const handleConnect = async (e) => {
        e.preventDefault();
        if (!selectedExchange || !apiKey || !apiSecret) {
            setError('Preencha todos os campos');
            return;
        }
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const exchange = exchangeService[selectedExchange];
            if (!exchange) {
                throw new Error('Exchange não suportado');
            }
            await exchange.connect(apiKey, apiSecret);
            setSuccess(`${exchange.name} conectado com sucesso!`);
            setApiKey('');
            setApiSecret('');
            loadExchanges();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async (exchangeName) => {
        if (window.confirm(`Desconectar de ${exchangeName}?`)) {
            try {
                await exchangeService.disconnectExchange(exchangeName);
                loadExchanges();
            } catch (err) {
                setError('Erro ao desconectar: ' + err.message);
            }
        }
    };

    return (
        <div className="exchange-menu">
            <div className="exchange-header">
                <h2>Conectar Exchanges</h2>
            </div>
            <form onSubmit={handleConnect} className="exchange-form">
                <div className="form-group">
                    <label htmlFor="exchange">Selecionar Exchange</label>
                    <select id="exchange" value={selectedExchange || ''} onChange={(e) => setSelectedExchange(e.target.value)} disabled={isLoading}>
                        <option value="">Escolha um exchange...</option>
                        <option value="binance">Binance (₿)</option>
                        <option value="coinbase">Coinbase (ℂ)</option>
                        <option value="kraken">Kraken (⚡)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="apiKey">API Key</label>
                    <input type="password" id="apiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Cole sua API Key" disabled={isLoading} />
                </div>
                <div className="form-group">
                    <label htmlFor="apiSecret">API Secret</label>
                    <input type="password" id="apiSecret" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} placeholder="Cole sua API Secret" disabled={isLoading} />
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <button type="submit" className="btn-connect" disabled={isLoading}> {isLoading ? 'Conectando...' : 'Conectar Exchange'} </button>
            </form>
            <div className="exchange-list">
                <h3>Exchanges Conectados</h3>
                {exchanges.length === 0 ? (
                    <p className="no-exchanges">Nenhum exchange conectado ainda</p>
                ) : (
                    <div className="exchanges-grid">
                        {exchanges.map((exchange) => (
                            <div key={exchange.name} className="exchange-card">
                                <div className="exchange-info">
                                    <span className="exchange-name">{exchange.name}</span>
                                    <span className="exchange-status">Conectado</span>
                                </div>
                                <button onClick={() => handleDisconnect(exchange.name)} className="btn-disconnect"> Desconectar </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExchangeMenu;
