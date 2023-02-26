import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { createList, deleteList, updateList } from "../../../api/lists";
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Title from '../../../components/ui/Title'
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlineLoading, AiOutlineUnorderedList } from "react-icons/ai";

export async function action ({ request, params }) {
  try {
    const token = window.localStorage.getItem("token");

    // POST (Creación de lista)
    if(request.method === "POST"){
      const form = await request.formData()
      const itemsCount = form.getAll("items");

      const items = []

      for (let index = 0; index < itemsCount.length; index++) {
        items.push({
          description: form.get(`item${index}`),
          completed: form.get(`itemCompleted${index}`)
        })
      }

      const objForm = {
        name: form.get("name"),
        items
      }

      const response = await createList(token, objForm)

      if(!response.data?.success){
        throw new Error()
      }

      return redirect("/user/lists")
    }

    // PUT (Actualización de lista)
    if(request.method === "PUT"){

      const form = await request.formData()
      const itemsCount = form.getAll("items");

      const items = []

      for (let index = 0; index < itemsCount.length; index++) {
        items.push({
          description: form.get(`item${index}`),
          completed: form.get(`itemCompleted${index}`)
        })
      }

      const objForm = {
        name: form.get("name"),
        items
      }

      const response = await updateList(token, objForm, params.listId)

      if(!response.data?.success){
        throw new Error()
      }

      return redirect(`/user/lists/${params.listId}`)
    }

    // DELETE (Eliminación de lista)
    if (request.method === "DELETE"){
      await deleteList(token, params.listId)
      return redirect("/user/lists")
    }

    throw new Error()
    
  } catch (error) {
    console.log(error)
    if (error?.response?.data?.errors) return error.response.data.errors

    throw new Error("Error al crear lista")
  }
}

function FormListPage() {
  const [items, setItems] = useState(Array.from(Array(1).keys()));
  const errors = useActionData()
  const list = useLoaderData()
  const navigate = useNavigate()
  const navigation = useNavigation()

  useEffect(() => {
    if(list){
      setItems(list.items)
    }
  }, [])
  

  function handleNewItem() {
    setItems([
      ...items,
      Array(1).keys()
    ]);
  }

  function handleDeleteItem() {
    if(!list){
      setItems(Array.from(Array(items.length-1).keys()))
    }else{
      const itemsAux = [...items]
      itemsAux.pop()
      setItems(itemsAux)
    }
    
  }

  return (
    <>
      <div className="flex justify-around">
        <div className='text-sm mt-3 md:ml-3 md:absolute md:left-4 md:top-4 md:m-0'>
          <Button 
            onClick={() => navigate("/user/lists")}
            customClasses="bg-cyan-500 border-cyan-400 hover:bg-cyan-700"
          >
            Volver a listas
          </Button>
        </div>

        {list && 
          <div className='text-sm mt-3 md:absolute md:right-4 md:top-4 md:m-0'>
            <Button 
              onClick={() => navigate(-1)}
              customClasses="bg-emerald-500 border-emerald-400 hover:bg-emerald-700"
            >
              Volver a detalles de lista
            </Button>
          </div>
        }
      </div>

      <Title><AiOutlineUnorderedList /> {list ? "Editar lista" : "Crear lista"}</Title>
      <Form
        method={list ? "PUT" : "POST"}
        className="border-2 border-gray-400 rounded-xl p-2 mx-auto w-3/4 max-w-[24rem] md:w-96 bg-white mb-2"
      >
        <div className="border-y-2 border-gray-200 pt-1 pb-2">
          <label htmlFor="list_name">Nombre de la lista:</label>
          <Input type="text" name="name" id="list_name" defaultValue={list ? list.name : ""} />
        </div>
        {items.map((item, i) => {
          return (
            <div key={i} className="border-b-2 border-gray-200 pt-1 pb-2">
              <label htmlFor={`list_item${i + 1}`}>Ítem {i + 1}:</label>
              
              <div className="flex flex-col gap-1 px-2">
                <div className="grid grid-cols-2 gap-1">
                  <label htmlFor={`itemCompleted${i}`}>Completado:</label>
                  <input type="checkbox" name={`itemCompleted${i}`} id={`itemCompleted${i}`} value="1" defaultChecked={list ? items[i].completed : false } className="w-5" />
                  <input type="hidden" name={`itemCompleted${i}`} value="0" />
                  <input type="hidden" name="items" />
                </div>
                { errors?.find(error => error.param === `items[${i}].completed`) && <p className="text-red-500 text-sm">{errors.find((error) => error.param === `items[${i}].completed`)?.msg}</p> }

                <div className="grid grid-cols-2 gap-1">
                  <label htmlFor={`list_item${i + 1}`}>Descripción:</label>
                  <Input
                    type="text"
                    name={`item${i}`}
                    id={`list_item${i + 1}`}
                    defaultValue={list ? items[i].description : ""}
                  />
                </div>
                { errors?.find(error => error.param === `items[${i}].description`) && <p className="text-red-500 text-sm text-center">{errors.find((error) => error.param === `items[${i}].description`)?.msg}</p> }
              </div>
            </div>
          );
        })}

        <div className="flex justify-center mt-3 mb-1 text-sm gap-6">
          <button type="button" onClick={handleNewItem}>
            <AiFillPlusCircle className="text-4xl text-blue-400 hover:text-blue-600" />
          </button>

          {items.length > 1 && 
            <button type="button" onClick={handleDeleteItem}>
              <AiFillCloseCircle className="text-4xl text-red-400 hover:text-red-600" />
            </button>
          }
        </div>

        <div className="flex justify-center pt-2">
          {navigation.state === "submitting" ?
            <Button isSubmitting={true}><AiOutlineLoading className='text-xl animate-spin' /></Button>
            :
            <Button>{list ? "Actualizar lista" : "Crear lista"}</Button>
          }
        </div>
      </Form>
    </>
  );
}

export default FormListPage;
