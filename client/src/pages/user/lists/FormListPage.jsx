import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { createList, deleteList, updateList } from "../../../api/lists";

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

  useEffect(() => {
    if(list){
      setItems(list.items)
    }
  }, [list])
  

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
      <Form
        method={list ? "PUT" : "POST"}
      >
        <div>
          <label htmlFor="list_name">Nombre de la lista:</label>
          <input type="text" name="name" id="list_name" defaultValue={list ? list.name : ""} />
        </div>
        {items.map((item, i) => {
          return (
            <div key={i}>
              <label htmlFor={`list_item${i + 1}`}>Ítem {i + 1}</label>
              <input
                type="text"
                name={`item${i}`}
                id={`list_item${i + 1}`}
                defaultValue={list ? items[i].description : ""}
              />
              <input type="checkbox" name={`itemCompleted${i}`} value="1" defaultChecked={list ? items[i].completed : false } />
              <input type="hidden" name={`itemCompleted${i}`} value="0" />
              <input type="hidden" name="items" />
            </div>
          );
        })}
        {errors ? 
          <ul>
            {errors.map((error, i) => <li key={`error${i}`}>{error.msg}</li>)}
          </ul> :
          ""
        }
        <button>{list ? "Actualizar lista" : "Crear lista"}</button>
      </Form>
      <button onClick={handleNewItem}>Agregar ítem</button>

      {items.length > 1 && <button onClick={handleDeleteItem}>Eliminar ítem</button>}
    </>
  );
}

export default FormListPage;
