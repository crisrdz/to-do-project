import { AiOutlineUnorderedList } from "react-icons/ai";
import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import { getLists } from "../../../api/lists";
import Button from "../../../components/ui/Button";
import ShortList from "../../../components/ui/ShortList";
import Title from "../../../components/ui/Title";

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
      <Title><AiOutlineUnorderedList /> Listas</Title>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3">
        {lists.map((list, i) => {
          return (
            <ShortList list={list} key={i} />
            );
          })}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCreate}>Nueva lista</Button>
      </div>
    </>
  );
}

export default ListsPage;
