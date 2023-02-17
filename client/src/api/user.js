import axios from "axios";

export const getUser = async (token) => {
  try {
    return await axios.get("/api/user", {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error?.response?.data === ""){
      window.localStorage.removeItem("token") 
    }
    return Promise.reject(error)
  }
};

export const updateUser = async (token, req) => {
  try {
    await axios.put("/api/user", req, {
      headers: {
        "x-access-token": token,
      },
    });
  } catch (error) {
    if(error.response?.data === ""){
      window.localStorage.removeItem("token")
    }

    return Promise.reject(error)
  }
}
