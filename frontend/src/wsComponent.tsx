import React, { useEffect, useState } from 'react';

const WebSocketComponent: React.FC = () => {
    const [status, setStatus] = useState<string>('Disconnected');
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8181');
        setWs(socket);

        socket.onopen = () => {
            setStatus('Connected');
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
            setStatus('Disconnected');
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws && input) {
            ws.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Status: {status}</p>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketComponent;