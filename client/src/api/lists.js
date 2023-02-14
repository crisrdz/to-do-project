import axios from 'axios'

export const getLists = async (token) => axios.get("/api/lists", {
  headers: {
    "x-access-token": token
  }
})

export const createList = async (token, req) => axios.post("/api/lists", req, {
  headers: {
    "x-access-token": token
  }
})

export const updateList = async (token, req, id) => axios.put(`/api/lists/${id}`, req, {
  headers: {
    "x-access-token": token
  }
})

export const deleteList = async (token, id) => axios.delete(`/api/lists/${id}`, {
  headers: {
    "x-access-token": token
  }
})

export const getList = async (token, id) => axios.get(`/api/lists/${id}`, {
  headers: {
    "x-access-token": token
  }
})