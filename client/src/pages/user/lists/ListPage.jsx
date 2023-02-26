import { useLoaderData, useNavigate } from "react-router-dom"
import { AiOutlineBorder, AiOutlineCheckSquare } from 'react-icons/ai'
import { getList } from "../../../api/lists"
import Title from '../../../components/ui/Title'
import Button from '../../../components/ui/Button'

export async function loader ({ params }) {
  try {
    const token = window.localStorage.getItem("token");
    const response = await getList(token, params.listId)
    
    if(!response.data.success){
      throw new Error()
    }

    return response.data.list
  } catch (error) {
    throw new Error("Error al obtener lista")
  }
}

function ListPage() {
  const list = useLoaderData()
  const navigate = useNavigate()
  const completedStyle = list.completed ? "text-green-500" : "text-red-500"

  return (
    <>
      <div className='text-sm ml-3 mt-3 md:absolute md:left-4 md:top-4 md:m-0'>
        <Button 
          onClick={() => navigate("/user/lists")}
          customClasses="bg-cyan-500 border-cyan-400 hover:bg-cyan-700"
        >
          Volver a listas
        </Button>
      </div>
      
      <div className="border-2 border-gray-400 rounded-xl p-2 my-2 mx-auto w-3/4 max-w-xs bg-white">
        <Title className="border-y-2 border-gray-200">{list.name}</Title>

        <p className={`border-b-2 border-gray-200 text-center ${completedStyle}`}>{list.completed ? "Completada" : "No completada"}</p>

        <ul>
          {list.items.map((item, i) => 
            <li key={i} className={`border-b-2 border-gray-200 flex items-center gap-1 p-1 ${item.completed && "line-through decoration-green-400"}`}>
              {item.completed ? <AiOutlineCheckSquare /> : <AiOutlineBorder />} {item.description}
            </li>
          )}
        </ul>

        <div className="flex justify-center pt-3">
          <Button onClick={() => navigate("edit")} customClasses="bg-blue-400 border-blue-300 hover:bg-blue-600">Editar</Button>
        </div>
      </div>
    </>
  )
}

export default ListPage