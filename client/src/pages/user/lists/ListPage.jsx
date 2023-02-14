import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getList } from "../../../api/lists"

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

  function handleEditList () {
    navigate("edit")
  }

  return (
    <>
      <h3>{list.name}</h3>

      <ul>
      {list.items.map((item, i)=> <li key={i}>{item.description} - {item.completed.toString()}</li>)}
      </ul>

      <h4>{list.completed.toString()}</h4>

      <button onClick={handleEditList}>Editar</button>
    </>
  )
}

export default ListPage