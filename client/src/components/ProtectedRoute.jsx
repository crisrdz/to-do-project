import { Navigate, Outlet, useOutletContext } from "react-router-dom"

function ProtectedRoute({ isMod = false }) {

  const user = useOutletContext()
  const roles = user.roles.map(role => role.name)

  if(!roles.includes("user")){
    return <Navigate to="/" replace />
  }

  if(isMod && !roles.includes("moderator")){
    return <Navigate to="/user" replace />
  }

  return <Outlet context={user} />
}

export default ProtectedRoute