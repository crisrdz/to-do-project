import {Outlet, NavLink} from 'react-router-dom'

function UserPage() {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Landing</NavLink>
          <NavLink to="">Home</NavLink>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="lists">Lists</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default UserPage