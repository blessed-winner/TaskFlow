import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

// Get token from localStorage for authentication
const getToken = () => {
    return localStorage.getItem('token')
}

export const socket = io(SERVER_URL,{
    transports:['websockets','polling'],
    auth: {
        token: getToken()
    },
    autoConnect: false // Don't auto-connect, wait for authentication
})

// Function to connect socket with current token
export const connectSocket = () => {
    const token = getToken()
    if (token) {
        socket.auth.token = token
        socket.connect()
    }
}

// Function to disconnect socket
export const disconnectSocket = () => {
    socket.disconnect()
}