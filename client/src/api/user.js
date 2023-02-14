import axios from 'axios'

export const getUser = async (token) => await axios.get("/api/user", {
  headers: {
    "x-access-token": token
  }
})

export const updateUser = async (token, req) => await axios.put("/api/user", req, {
  headers: {
    "x-access-token": token
  }
})