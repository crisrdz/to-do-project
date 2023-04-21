import { useState } from 'react'
import { AiOutlineMenu, AiOutlineHome, AiOutlineUser, AiOutlineUnorderedList, AiOutlineLock, AiOutlineLoading } from 'react-icons/ai'
import { Outlet, NavLink, useNavigate, useLoaderData, redirect, useNavigation } from 'react-router-dom'
import { getUser } from '../../api/user'
import background from '../../assets/background.jpg'
import ModalConfirm from '../../components/modals/ModalConfirm'
import Footer from '../../components/ui/Footer'

export async function loader () {
  try {
    const redo = JSON.parse(window.sessionStorage.getItem("redo")) 
    const token = window.localStorage.getItem("token")
    
    if(redo?.getUser){
      getUser.delete(token);

      redo.getUser = false;
      window.sessionStorage.setItem("redo", JSON.stringify(redo));
      
      const response = await getUser(token);
      return response.data.user
    }

    const response = await getUser(token)

    return response.data.user
  } catch (error) {
    return redirect("/")
  }
}

function UserPage() {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const navigation = useNavigation()
  const styleClasses = "flex flex-row items-center gap-1 hover:text-teal-200"
  
  const user = useLoaderData();
  
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
          { user.roles.some(role => role.name === "moderator") &&
            <li className='flex justify-center'>
              <NavLink 
                to="admin" 
                className={({ isActive }) => isActive ? `${styleClasses} text-teal-200` : `${styleClasses} text-teal-50`} 
                onClick={() => setMenu(false)}
                end
              >
                <AiOutlineLock />{user.roles.some(role => role.name === "admin") ? "Admin" : "Moderador"}
              </NavLink>
            </li>
          }
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
          <button className='text-red-200 flex self-center w-max border-t-2 border-teal-800 border-opacity-20 pt-1 md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2' onClick={(e) => handleLogout(e)}>
            Cerrar sesión
          </button>
        </ul>
      </aside>
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
      <div className='md:w-4/5 md:float-right'>
        <main style={{backgroundImage: `url("${background}")`}} className='relative bg-cover min-h-[calc(100vh-2.5rem-7rem)] md:min-h-[calc(100vh-8rem)] flex flex-col justify-center'>

          {navigation.state === "loading" && 
            <div className="z-50 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full">
              <div className="fixed left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2"><AiOutlineLoading className="text-3xl text-white animate-spin" /></div>
            </div>
          }

          <Outlet context={user} />
          <div className='absolute right-1 bottom-0 text-sm'>
            Image by <a href="https://www.freepik.com/free-vector/white-abstract-background_11852424.htm#query=background&position=27&from_view=search&track=sph">Freepik</a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default UserPage