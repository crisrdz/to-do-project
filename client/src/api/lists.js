import axios from 'axios'

export const getLists = async (token) => {
  try {
    return await axios.get("/api/lists", {
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

export const createList = async (token, req) => {
  try {
    return await axios.post("/api/lists", req, {
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

export const updateList = async (token, req, id) => {
  try {
    return await axios.put(`/api/lists/${id}`, req, {
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

export const deleteList = async (token, id) => {
  try {
    return await axios.delete(`/api/lists/${id}`, {
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