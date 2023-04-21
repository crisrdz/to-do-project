import axios from 'axios'
import memoize from 'memoizee'
import { addRedo } from '../common/common'

export const getLists = memoize(async (token, page) => {
  try {
    return await axios.get("/api/lists", {
      headers: {
        "x-access-token": token
      },
      params: {
        page: page
      }
    })
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }
    
    return Promise.reject(error)
  }
})

export const createList = async (token, req) => {
  try {
    const response = await axios.post("/api/lists", req, {
      headers: {
        "x-access-token": token
      }
    });

    addRedo("getLists");

    return response;
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }

    return Promise.reject(error)
  }
}

export const updateList = async (token, req, id) => {
  try {
    const response = await axios.put(`/api/lists/${id}`, req, {
      headers: {
        "x-access-token": token
      }
    });

    addRedo("getLists");

    return response;
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }

    return Promise.reject(error)
  }
}

export const deleteList = async (token, id) => {
  try {
    const response = await axios.delete(`/api/lists/${id}`, {
      headers: {
        "x-access-token": token
      }
    })

    addRedo("getLists");

    return response;
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }

    return Promise.reject(error)
  }
}

export const getList = async (token, id) => {
  try {
    return await axios.get(`/api/lists/${id}`, {
      headers: {
        "x-access-token": token
      }
    })
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }
    
    return Promise.reject(error)
  }
}