import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import { getLists } from "../../../api/lists";

export async function loader() {
  try {
    const token = window.localStorage.getItem("token");
    const response = await getLists(token);

    return response.data.lists;
  } catch (error) {
    throw new Error("Error al leer los datos del usuario");
  }
}

function ListsPage() {
  const lists = useLoaderData();
  const navigate = useNavigate()

  function handleCreate () {
    navigate("create")
  }

  return (
    <>
      <div>ListsPage</div>
      <button onClick={handleCreate}>Nueva lista</button>
        {lists.map((list, i) => {
          return (
            <div key={i}>
              <h3>{list.name}</h3>
              <Link to={list._id}>{list.name}</Link>
              <ul>
                {list.items.map(item => <li key={item._id}>{item.description} - {item.completed.toString()}</li>)}
              </ul>
              <Form
                action={`${list._id}/delete`}
                method="DELETE"
              >
                <button>Eliminar lista</button>
              </Form>
            </div>
          );
        })}
    </>
  );
}

export default ListsPage;
