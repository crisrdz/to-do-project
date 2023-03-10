import { redirect, useActionData, useNavigation } from "react-router-dom";
import { register } from "../../api/auth";
import { AiFillCloseSquare, AiOutlineLoading } from 'react-icons/ai'
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
  const navigation = useNavigation()

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
        { errors ? <p className="text-red-500 text-sm">{errors.find((error) => error.param === "email")?.msg}</p> : <p className="text-gray-500 text-sm">Ingresa un email válido <i>(ej: example@email.com)</i></p>}
      </div>

      <div>
        <label htmlFor="username" className="block">Nombre de usuario</label>
        <Input type="text" name="username" id="username" />
        { errors ? <p className="text-red-500 text-sm">{errors.find((error) => error.param === "username")?.msg}</p> : <p className="text-gray-500 text-sm">El nombre de usuario debe tener mínimo 8 caracteres y deben ser únicamente letras y/o números <i>(ej: userexample12)</i></p>}
      </div>

      <div>
        <label htmlFor="passwordOne" className="block">Contraseña</label>
        <Input type="password" name="passwordOne" id="passwordOne" />
        { errors ? <p className="text-red-500 text-sm">{errors.find((error) => error.param === "passwordOne")?.msg}</p> : <p className="text-gray-500 text-sm">La contraseña debe tener por lo menos 8 caracteres y debe contener 1 letra minúscula, 1 letra mayúscula, 1 número y 1 símbolo <i>(ej: Password123@)</i></p> }
      </div>

      <div>
        <label htmlFor="passwordTwo" className="block">Confirmar contraseña</label>
        <Input type="password" name="passwordTwo" id="passwordTwo" />
        { errors && <p className="text-red-500 text-sm">{errors.find((error) => error.param === "passwordTwo")?.msg}</p> }
      </div>

      <div className="flex justify-center">
        {navigation.state === "submitting" ? <Button isSubmitting={true}><AiOutlineLoading className='text-xl animate-spin'/></Button> : <Button>Registrarse</Button>}
      </div>
    </ModalForm>
  )
}

export default Register