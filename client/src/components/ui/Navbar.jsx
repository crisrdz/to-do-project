import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import ModalConfirm from '../modals/ModalConfirm'

function Navbar({ isLoggedIn, handleLogin, handleRegister }) {
  const navigate = useNavigate()
  const [menu, setMenu] = useState(true)
  const [modalProps, setModalProps] = useState({
    show: false,
    eventTarget: null,
    messages: {
      main: null
    }
  })

  function handleLogout (e) {
    setModalProps({
      show: true,
      eventTarget: e.target,
      messages: {
        main: "¿Estás seguro de que quieres cerrar sesión?"
      }
    })
  }

  return (
    <>
      {
        modalProps.show &&
          <ModalConfirm 
            close={() => setModalProps({...modalProps, show: false})}
            confirm={() => {
              window.localStorage.removeItem("token")
              navigate("/")
            }}
          >
            <p className="text-center">{modalProps.messages.main}</p>
            {!!modalProps.messages.optional && <p className="text-red-400 text-center">{modalProps.messages.optional}</p>}
          </ModalConfirm>
      }
      <nav className='px-3 py-4 bg-teal-600 text-teal-50 text-lg flex justify-between h-16 items-center shadow-md'>
        <h3 className='font-["Julee"] text-4xl ml-6'><NavLink to="/">To-Do App</NavLink></h3>
        <button onClick={() => setMenu(!menu)} className="md:hidden"><AiOutlineMenu className='text-2xl' /></button>
        <ul className={`gap-3 absolute right-1 -z-10 text-gray-700 border-2 border-gray-200 rounded-xl overflow-hidden shadow-md py-1 bg-gray-50 ${menu ? "opacity-100 top-16 z-10" : "opacity-0 -top-96"} transition-all md:flex md:static md:bottom md:border-none md:text-teal-50 md:shadow-none md:bg-transparent `}>
          {isLoggedIn ? 
            <>
              <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><NavLink to="/user">Usuario</NavLink></li>
              <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={(e) => handleLogout(e)}>Cerrar sesión</button></li>
            </>
            :
            <>
              <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleRegister}>Registrarse</button></li>
              <li className='p-2 transition-all hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-200'><button onClick={handleLogin}>Iniciar sesión</button></li>
            </>
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar