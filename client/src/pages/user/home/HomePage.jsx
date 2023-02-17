import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"
import Button from "../../../components/Button"
import CardHome from "../../../components/CardHome"

function HomePage() {
  return (
    <>
      <h2 className="text-center text-4xl font-bold p-3 flex w-full justify-center items-center gap-2"> <AiOutlineHome />Home</h2>
      
      <div className="flex flex-col md:gap-6">
        <CardHome customClasses="border-blue-700 bg-blue-100">
          <div className="flex justify-center items-center">
            <AiOutlineUser className="text-8xl text-blue-900" />
          </div>
          <div className="flex justify-center h-max">
            <Button customClasses="bg-blue-600 hover:bg-blue-800 border-blue-700 w-32">
              <Link to="profile">Perfil</Link>
            </Button>
          </div>
        </CardHome>

        <CardHome customClasses="border-cyan-600 bg-cyan-100">
          <div className="flex justify-center items-center">
            <AiOutlineUnorderedList className="text-8xl text-cyan-500" />
          </div>
          <div className="flex justify-center h-max">
            <Button customClasses="bg-cyan-500 hover:bg-cyan-700 border-cyan-600 w-32">
              <Link to="lists">Listas</Link>
            </Button>
          </div>
        </CardHome>
      </div>
    </>
  )
}

export default HomePage