import axios from "axios";

// admin requests
export const getUsers = async (token, page) => {
  try {
    return await axios.get("/api/user/admin", {
      headers: {
        "x-access-token": token,
      },
      params: {
        page
      }
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }
    return Promise.reject(error)
  }
};

// user requests
export const getUser = async (token) => {
  try {
    return await axios.get("/api/user", {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token") 
    }
    return Promise.reject(error)
  }
};

export const updateUser = async (token, req) => {
  try {
    return await axios.put("/api/user", req, {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token")
    }
    return Promise.reject(error)
  }
}

export const disableUser = async (token, req) => {
  try {
    return await axios.put("/api/user/admin/disable", req, {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token")
    }
    return Promise.reject(error)
  }
}

export const enableUser = async (token, req) => {
  try {
    return await axios.put("/api/user/admin/enable", req, {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token")
    }
    return Promise.reject(error)
  }
}

export const changeRole = async (token, req) => {
  try {
    return await axios.put("/api/user/admin/changeRole", req, {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response.status !== 500){
      window.localStorage.removeItem("token")
    }
    return Promise.reject(error)
  }
}