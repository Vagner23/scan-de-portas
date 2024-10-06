const net = require('net');

const host = 'localhost'; // Alvo da varredura
const startPort = 1; // Porta inicial
const endPort = 65535; // Porta final

const scanPort = (port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000); // Timeout de 2 segundos

        socket.on('connect', () => {
            resolve({ port, status: 'open' });
            socket.destroy();
        });

        socket.on('timeout', () => {
            resolve({ port, status: 'closed' });
            socket.destroy();
        });

        socket.on('error', () => {
            resolve({ port, status: 'closed' });
        });

        socket.connect(port, host);
    });
};

const scanPorts = async () => {
    const results = [];
    for (let port = startPort; port <= endPort; port++) {
        const result = await scanPort(port);
        results.push(result);
        console.log(`Port ${result.port}: ${result.status}`);
    }
    return results;
};

scanPorts();
