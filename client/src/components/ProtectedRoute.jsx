import { Navigate, Outlet, useOutletContext } from "react-router-dom"

function ProtectedRoute({ isAdmin = false }) {

  const user = useOutletContext()
  const roles = user.roles.map(role => role.name)

  if(!roles.includes("user")){
    return <Navigate to="/" replace />
  }

  if(isAdmin && !roles.includes("admin")){
    return <Navigate to="/user" replace />
  }

  return <Outlet />
}

export default ProtectedRoute