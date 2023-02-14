import { useState } from 'react'
import  { NavLink, useNavigate } from 'react-router-dom'
import Login from './modals/Login'
import Register from './modals/Register'
import "./Navbar.css"

function Navbar({ isLoggedIn }) {

  const navigate = useNavigate()
  const [hiddenLogin, setHiddenLogin] = useState(true)
  const [hiddenRegister, setHiddenRegister] = useState(true)
  const [menu, setMenu] = useState(true)

  function handleLogout () {
    window.localStorage.removeItem("token")
    navigate("/")
  }

  function handleLogin () {
    if(hiddenLogin && !hiddenRegister){
      setHiddenRegister(true)
    }
    
    setHiddenLogin(!hiddenLogin)
    
    if(hiddenLogin){
      navigate("/")
    }
  }

  function handleRegister () {
    if(hiddenRegister && !hiddenLogin){
      setHiddenLogin(true)
    }
    
    setHiddenRegister(!hiddenRegister)
    
    if(hiddenRegister){
      navigate("/")
    }
  }

  return (
    <nav className='px-3 py-4 bg-teal-600 text-teal-50 text-lg flex justify-between h-16 items-center shadow-md'>
      <h3 className='font-["Julee"] text-xl'>To-Do</h3>
      <button onClick={() => setMenu(!menu)} className="md:hidden">Dropdown</button>
      <ul className={`gap-2 absolute right-1 -z-10 text-gray-700 border-2 border-gray-200 rounded-xl overflow-hidden shadow-md py-1 bg-gray-50 ${menu ? "opacity-100 top-16 z-10" : "opacity-0 -top-96"} transition-all md:flex md:static md:bottom md:border-none md:text-teal-50 md:shadow-none md:bg-transparent `}>
        <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><NavLink to="/">Landing</NavLink></li>
        {isLoggedIn ? 
          <>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><NavLink to="/user">Home</NavLink></li>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleLogout}>Cerrar sesión</button></li>
          </>
          :
          <>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleRegister}>Registrarse</button></li>
            <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleLogin}>Iniciar sesión</button></li>
            {!hiddenRegister && <Register hidden={hiddenRegister} />}
            {!hiddenLogin && <Login hidden={hiddenLogin} />}
          </>
        }
        
      </ul>
    </nav>
  )
}

export default Navbar