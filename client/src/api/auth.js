import axios from 'axios'

export const login = async (req) => {
  try {
    return await axios.post("/api/auth/login", req)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const register = async (req) => {
  try {
    return await axios.post("/api/auth/register", req)
  } catch (error) {
    return Promise.reject(error)
  }
}