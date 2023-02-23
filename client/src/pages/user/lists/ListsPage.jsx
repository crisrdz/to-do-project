import { AiOutlineUnorderedList } from "react-icons/ai";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getLists } from "../../../api/lists";
import Button from "../../../components/ui/Button";
import ShortList from "../../../components/ui/ShortList";
import Title from "../../../components/ui/Title";

export async function loader({request}) {
  try {
    const currentPage = new URL(request.url).searchParams.get("page")
    const token = window.localStorage.getItem("token");
    let response;
    if(!currentPage || parseInt(currentPage) < 1){
      return redirect("/user/lists?page=1")
    }else{
      response = await getLists(token, currentPage);
    }

    return response.data.lists;
  } catch (error) {
    throw new Error("Error al leer los datos del usuario");
  }
}

function ListsPage() {
  const lists = useLoaderData();
  const navigate = useNavigate()
  let currentPage = parseInt(new URL(window.location).searchParams.get("page"))
  
  if(isNaN(currentPage)){
    currentPage = 1
  }
  console.log(currentPage)

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
      <div className="flex justify-center gap-5">
        <Button onClick={() => navigate(`?page=${currentPage-1}`)}>Anterior</Button>
        <Button onClick={handleCreate}>Nueva lista</Button>
        <Button onClick={() => navigate(`?page=${currentPage+1}`)}>Siguiente</Button>
      </div>
    </>
  );
}

export default ListsPage;
