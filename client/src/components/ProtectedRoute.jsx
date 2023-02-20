import { Navigate, useLoaderData } from "react-router-dom"
import { getUser } from "../api/user"

export async function loader () {
  try {
    const token = window.localStorage.getItem("token")
    const response = await getUser(token)
    
    return response.data.user
  } catch (error) {
    throw new Error(error)
  }
}

function ProtectedRoute({ children }) {

  const user = useLoaderData()
  const roles = user.roles.map(role => role.name)

  if(!roles.includes("user")){
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute