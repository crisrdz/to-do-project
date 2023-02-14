import { Outlet, useLoaderData } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export function loader() {
  return window.localStorage.getItem("token")
}

function Layout({children}) {
  let data = null

  if(!children){
    data = useLoaderData()
  }

  return (
    <div className="grid">
      <header>
        <Navbar isLoggedIn={data ? true : false} />
      </header>
      
      {children ? children : <Outlet />}
      
      <Footer />
    </div>
  )
}

export default Layout