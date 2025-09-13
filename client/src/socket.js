import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

export const socket = io(SERVER_URL,{
    transports:['websockets','polling']
})