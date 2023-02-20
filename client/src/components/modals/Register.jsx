import { redirect, useActionData } from "react-router-dom";
import { register } from "../../api/auth";
import { AiFillCloseSquare } from 'react-icons/ai'
import Button from "../ui//Button";
import Input from "../ui/Input";
import ModalForm from "./ModalForm";

export async function action ({ request }) {
  try {
    const form = await request.formData()
    const objForm = Object.fromEntries(form)

    const response = await register(objForm)

    if(response.data.success){
      window.localStorage.setItem("token", response.data.token)
    }else{
      throw new Error()
    }

    return redirect("/user")
  } catch (error) {
    if(error.response?.data?.errors){
      return error.response.data.errors
    }

    throw new Error("Error en el registro de usuario")
  }  
}

function Register({ handleRegister }) {
  let errors = useActionData()

  return (
    <ModalForm 
      method="post"
      action="/register"
      title="Registro"
    >
      <button type="button" className="text-red-500 w-max h-max absolute right-2 top-1" onClick={handleRegister}><AiFillCloseSquare className="w-8 h-8" /></button>

      <div>
        <label htmlFor="emailRegister" className="block">Email</label>
        <Input type="text" name="email" id="emailRegister" />
        { errors && <p className="text-red-500 text-sm">{errors.find((error) => error.param === "email")?.msg}</p> }
      </div>

      <div>
        <label htmlFor="username" className="block">Nombre de usuario</label>
        <Input type="text" name="username" id="username" />
        { errors && <p className="text-red-500 text-sm">{errors.find((error) => error.param === "username")?.msg}</p> }
      </div>

      <div>
        <label htmlFor="passwordOne" className="block">Contraseña</label>
        <Input type="password" name="passwordOne" id="passwordOne" />
        { errors && <p className="text-red-500 text-sm">{errors.find((error) => error.param === "passwordOne")?.msg}</p> }
      </div>

      <div>
        <label htmlFor="passwordTwo" className="block">Confirmar contraseña</label>
        <Input type="password" name="passwordTwo" id="passwordTwo" />
        { errors && <p className="text-red-500 text-sm">{errors.find((error) => error.param === "passwordTwo")?.msg}</p> }
      </div>

      <div className="flex justify-center">
        <Button>Registrarse</Button>
      </div>
    </ModalForm>
  )
}

export default Register