import { useState } from 'react'
import { AiOutlineMenu, AiOutlineHome, AiOutlineUser, AiOutlineUnorderedList } from 'react-icons/ai'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import background from '../../assets/background.jpg'
import Footer from '../../components/ui/Footer'

function UserPage() {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const styleClasses = "flex flex-row items-center gap-1 hover:text-teal-200"

  function handleLogout () {
    window.localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
      <aside className='relative bg-teal-600 text-center p-2 text-teal-50 h-10 md:h-screen md:text-lg md:shadow-[0_0_30px_-8px_gray] md:border-r-2 md:border-teal-800 md:border-opacity-30 md:flex md:flex-col md:justify-center md:fixed md:z-10 md:w-1/5'>
        <button onClick={() => setMenu(!menu)} className="md:hidden"><AiOutlineMenu className='text-2xl' /></button>
        <ul className={`absolute bg-teal-600 w-full left-0 transition-all flex flex-col gap-2 p-1 ${menu ? "opacity-100 z-10" : "opacity-0 -z-10"} md:static md:opacity-100 md:z-10 md:gap-3`}>
          <h3 className='font-["Julee"] w-max flex self-center text-2xl border-b-2 border-teal-800 border-opacity-20 pb-2 md:text-3xl md:absolute md:top-10 md:left-1/2 md:-translate-x-1/2 lg:text-4xl'><NavLink to="/">To-Do App</NavLink></h3>
          <li className='flex justify-center'>
            <NavLink 
              to="" 
              className={({ isActive }) => isActive ? `${styleClasses} text-teal-200` : `${styleClasses} text-teal-50`} 
              onClick={() => setMenu(false)}
              end
            >
              <AiOutlineHome />Home
            </NavLink>
          </li>
          <li className='flex justify-center'>
            <NavLink 
              to="profile"
              className={({ isActive }) => isActive ? `${styleClasses} text-teal-200` : `${styleClasses} text-teal-50`} 
              onClick={() => setMenu(false)}
              end
            >
              <AiOutlineUser />Perfil
            </NavLink>
          </li>
          <li className='flex justify-center'>
            <NavLink 
              to="lists"
              className={({ isActive }) => isActive ? `${styleClasses} text-teal-200` : `${styleClasses} text-teal-50`} 
              onClick={() => setMenu(false)}
              end
            >
              <AiOutlineUnorderedList />Listas
            </NavLink>
          </li>
          <button className='text-red-200 flex self-center w-max border-t-2 border-teal-800 border-opacity-20 pt-1 md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2' onClick={handleLogout}>
            Cerrar sesión
          </button>
        </ul>
      </aside>
      <div className='md:w-4/5 md:float-right'>
        <main style={{backgroundImage: `url("${background}")`}} className='relative bg-cover min-h-[calc(100vh-2.5rem-7rem)] md:min-h-[calc(100vh-8rem)] flex flex-col justify-center'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default UserPage