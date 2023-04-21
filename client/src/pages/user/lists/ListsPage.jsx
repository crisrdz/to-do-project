import { AiFillCaretLeft, AiFillCaretRight, AiOutlineUnorderedList } from "react-icons/ai";
import { redirect, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { getLists } from "../../../api/lists";
import Button from "../../../components/ui/Button";
import ShortList from "../../../components/ui/ShortList";
import Title from "../../../components/ui/Title";

export async function loader({request}) {
  try {
    const currentPage = new URL(request.url).searchParams.get("page")
    
    let response;
    if(!currentPage || parseInt(currentPage) < 1){
      return redirect("/user/lists?page=1")
    }else{
      const token = window.localStorage.getItem("token")
      const redo = JSON.parse(window.sessionStorage.getItem("redo")) 
      
      if(redo?.getLists){
        getLists.delete(token, currentPage);
        redo.getLists = false;
        window.sessionStorage.setItem("redo", JSON.stringify(redo));        
      }
      response = await getLists(token, currentPage);
    }

    if(response.data.lists.length === 0 && currentPage > 1) return redirect("/user/lists?page=1")

    return response.data.lists;
  } catch (error) {
    throw new Error("Error al leer los datos del usuario");
  }
}

function ListsPage() {
  const lists = useLoaderData();
  const listCount = useOutletContext().listCount
  const navigate = useNavigate()
  const currentPage = parseInt(new URL(window.location).searchParams.get("page"))

  function handleCreate () {
    navigate("create")
  }

  return (
    <>
      <Title><AiOutlineUnorderedList /> Listas</Title>
      <div className="flex justify-center gap-5 m-1">
        <Button onClick={handleCreate}>Nueva lista</Button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3">
        {lists.map((list, i) => {
          return (
            <ShortList list={list} key={i} />
            );
          })}
      </div>
      <div className="flex justify-center gap-5 mt-2 mb-3">
        {
          currentPage > 1 ?
            <Button onClick={() => navigate(`?page=${currentPage-1}`)} customClasses="bg-blue-500 hover:bg-blue-700 border-blue-400" type="button"><AiFillCaretLeft className="text-xl" /></Button> :
            <Button customClasses="invisible" type="button"><AiFillCaretLeft className="text-xl" /></Button>
        }
        <p className="text-xl bg-blue-500 border-blue-400 text-white rounded-xl flex items-center p-2 border-2">{isNaN(currentPage) ? "1" : currentPage}</p>
        {
          listCount > 12 * currentPage ?
          <Button onClick={() => navigate(`?page=${currentPage+1}`)} customClasses="bg-blue-500 hover:bg-blue-700 border-blue-400" type="button"><AiFillCaretRight className="text-xl" /></Button> :
          <Button customClasses="invisible" type="button"><AiFillCaretRight className="text-xl" /></Button>
        }
      </div>
    </>
  );
}

export default ListsPage;
