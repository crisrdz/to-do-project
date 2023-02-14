import { useState } from "react";
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { updateUser } from "../../../api/user";

export async function action ({ request }) {
  try {
    const token = window.localStorage.getItem("token");

    const form = await request.formData()
    const objForm = Object.fromEntries(form)

    const response = await updateUser(token, objForm)

    if(!response.data?.success){
      throw new Error()
    }

    return redirect("/user/profile")
  } catch (error) {
    if (error.response?.data?.errors) return error.response.data.errors

    throw new Error("Error al actualizar usuario")
  }
}

function EditProfilePage() {
  const errors = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate("/user/profile")}>Volver al perfil</button>
      <Form
        action=""
        method="put"
      >
        <div>
          <label htmlFor="username">Nombre de usuario: </label>
          <input type="text" name="username" id="username" />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico: </label>
          <input type="text" name="email" />
        </div>
        
        <div>
          <label htmlFor="passwordOne">Contraseña: </label>
          <input type="password" name="passwordOne" />
        </div>
        
        <div>
          <label htmlFor="passwordTwo">Confirmar contraseña: </label>
          <input type="password" name="passwordTwo" />
        </div>
        
        <div>
          <label htmlFor="passwordOld">Contraseña anterior: </label>
          <input type="password" name="passwordOld" />
        </div>

        {errors ?
          <ul>
            {errors.map(error => <li key={error.msg}>{error.msg}</li>)}
          </ul> :
          ""
        }

        <button>Editar</button>
      </Form>
    </>
  )
}

export default EditProfilePage