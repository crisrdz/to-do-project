import axios from 'axios'

export const login = async (req) => await axios.post("/api/auth/login", req)

export const register = async (req) => await axios.post("/api/auth/register", req)