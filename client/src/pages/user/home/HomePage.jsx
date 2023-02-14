import { Link } from "react-router-dom"

function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <Link to="profile">Perfil</Link>
      <Link to="lists">Listas</Link>
    </>
  )
}

export default HomePage