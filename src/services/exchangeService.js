import axiosInstance from '../utils/axiosConfig';

export const exchangeService = {
    binance: {
        name: 'Binance',
        icon: '₿',
        baseURL: 'https://api.binance.com/api',
        connect: async (apiKey, apiSecret) => {
            try {
                const response = await axiosInstance.post('/exchanges/binance/connect', { apiKey, apiSecret });
                return response.data;
            } catch (error) {
                throw new Error('Falha ao conectar com Binance: ' + error.message);
            }
        },
        getBalance: async () => {
            const response = await axiosInstance.get('/exchanges/binance/balance');
            return response.data;
        },
        getTrades: async (limit = 10) => {
            const response = await axiosInstance.get('/exchanges/binance/trades', { params: { limit } });
            return response.data;
        }
    },
    coinbase: {
        name: 'Coinbase',
        icon: 'ℂ',
        baseURL: 'https://api.coinbase.com/v2',
        connect: async (apiKey, apiSecret) => {
            try {
                const response = await axiosInstance.post('/exchanges/coinbase/connect', { apiKey, apiSecret });
                return response.data;
            } catch (error) {
                throw new Error('Falha ao conectar com Coinbase: ' + error.message);
            }
        },
        getBalance: async () => {
            const response = await axiosInstance.get('/exchanges/coinbase/balance');
            return response.data;
        },
        getTrades: async (limit = 10) => {
            const response = await axiosInstance.get('/exchanges/coinbase/trades', { params: { limit } });
            return response.data;
        }
    },
    kraken: {
        name: 'Kraken',
        icon: '⚡',
        baseURL: 'https://api.kraken.com',
        connect: async (apiKey, apiSecret) => {
            try {
                const response = await axiosInstance.post('/exchanges/kraken/connect', { apiKey, apiSecret });
                return response.data;
            } catch (error) {
                throw new Error('Falha ao conectar com Kraken: ' + error.message);
            }
        },
        getBalance: async () => {
            const response = await axiosInstance.get('/exchanges/kraken/balance');
            return response.data;
        },
        getTrades: async (limit = 10) => {
            const response = await axiosInstance.get('/exchanges/kraken/trades', { params: { limit } });
            return response.data;
        }
    },
    getConnectedExchanges: async () => {
        const response = await axiosInstance.get('/exchanges/connected');
        return response.data;
    },
    disconnectExchange: async (exchangeName) => {
        const response = await axiosInstance.delete(`/exchanges/${exchangeName}`);
        return response.data;
    }
};