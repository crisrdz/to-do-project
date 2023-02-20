import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import Navbar from "../components/ui/Navbar"
import Footer from "../components/ui/Footer"
import Login from "../components/modals/Login"
import Register from "../components/modals/Register"
import { useState } from "react"
import background from '../assets/background.jpg'

export function loader() {
  return window.localStorage.getItem("token")
}

function Layout({children}) {
  let data = null

  const navigate = useNavigate()

  const [hiddenLogin, setHiddenLogin] = useState(true)
  const [hiddenRegister, setHiddenRegister] = useState(true)
  
  if(!children){
    data = useLoaderData()
  }

  function handleLogin () {
    if(data){
      return navigate("/user")
    }

    navigate("/")

    setHiddenLogin(!hiddenLogin)
  }

  function handleRegister () {
    if(data){
      return navigate("/user")
    }
      
    navigate("/")
    
    setHiddenRegister(!hiddenRegister)
  }


  return (
    <>
      <header>
        <Navbar isLoggedIn={data ? true : false} handleLogin={handleLogin} handleRegister={handleRegister} />
      </header>
      
      <div className={`h-screen w-screen bg-black fixed opacity-50 top-0 left-0 ${ !hiddenRegister || !hiddenLogin ? "z-10" : "hidden -z-10"}`}></div>
      {!hiddenRegister && <Register handleRegister={handleRegister} />}
      {!hiddenLogin && <Login handleLogin={handleLogin} />}

      <main className="flex flex-col items-center justify-center bg-cover min-h-[calc(100vh-4rem-7rem)] md:flex-row md:min-h-[calc(100vh-4rem-8rem)] lg:gap-32" style={{backgroundImage: `url("${background}")`}}>
        <Outlet context={handleRegister} />
      </main>
      
      <Footer />
    </>
  )
}

export default Layout