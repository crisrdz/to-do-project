import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

function Navbar({ isLoggedIn, handleLogin, handleRegister }) {

  const navigate = useNavigate()

  const [menu, setMenu] = useState(true)

  function handleLogout () {
    window.localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className='px-3 py-4 bg-teal-600 text-teal-50 text-lg flex justify-between h-16 items-center shadow-md'>
      <h3 className='font-["Julee"] text-4xl ml-6'><NavLink to="/">To-Do App</NavLink></h3>
      <button onClick={() => setMenu(!menu)} className="md:hidden"><AiOutlineMenu className='text-2xl' /></button>
      <ul className={`gap-3 absolute right-1 -z-10 text-gray-700 border-2 border-gray-200 rounded-xl overflow-hidden shadow-md py-1 bg-gray-50 ${menu ? "opacity-100 top-16 z-10" : "opacity-0 -top-96"} transition-all md:flex md:static md:bottom md:border-none md:text-teal-50 md:shadow-none md:bg-transparent `}>
        {isLoggedIn ? 
          <>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><NavLink to="/user">Usuario</NavLink></li>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleLogout}>Cerrar sesión</button></li>
          </>
          :
          <>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleRegister}>Registrarse</button></li>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleLogin}>Iniciar sesión</button></li>
          </>
        }
      </ul>
      
    </nav>
  )
}

export default Navbar