import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"
import Button from "../../../components/ui/Button"
import CardHome from "../../../components/ui/CardHome"
import Title from "../../../components/ui/Title"

function HomePage() {
  return (
    <>
      <Title>
        <AiOutlineHome />Home
      </Title>
      
      <div className="flex flex-col md:gap-6">
        <CardHome customClasses="border-blue-300 bg-blue-100">
          <div className="flex justify-center items-center">
            <AiOutlineUser className="text-8xl text-blue-600" />
          </div>
          <div className="flex justify-center h-max">
            <Button customClasses="bg-blue-500 hover:bg-blue-800 border-blue-300 w-32">
              <Link to="profile">Perfil</Link>
            </Button>
          </div>
        </CardHome>

        <CardHome customClasses="border-cyan-300 bg-cyan-100">
          <div className="flex justify-center items-center">
            <AiOutlineUnorderedList className="text-8xl text-cyan-500" />
          </div>
          <div className="flex justify-center h-max">
            <Button customClasses="bg-cyan-500 hover:bg-cyan-700 border-cyan-400 w-32">
              <Link to="lists">Listas</Link>
            </Button>
          </div>
        </CardHome>
      </div>
    </>
  )
}

export default HomePage