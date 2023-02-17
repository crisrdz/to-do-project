import { Form, redirect, useActionData } from 'react-router-dom'
import { login } from '../../api/auth.js'
import ModalForm from './ModalForm.jsx'
import { AiFillCloseSquare } from 'react-icons/ai'
import Button from '../Button.jsx'
import Input from '../Input.jsx'

export async function action ({ request }) {
  try {
    const form = await request.formData()
    const objForm = Object.fromEntries(form)

    const response = await login(objForm)

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

    throw new Error("Error en el inicio de sesión")
  }
}


function Login ({ handleLogin }) {
  const errors = useActionData()

  return (
    <ModalForm 
      method='post'
      action='/login'
      title="Inicio sesión"
    >
      <button type="button" className="text-red-500 w-max h-max absolute right-2 top-1" onClick={handleLogin}><AiFillCloseSquare className="w-8 h-8" /></button>

      <div>
        <label htmlFor="emailLogin" className='block'>Correo electrónico</label>
        <Input type="text" name='email' id="emailLogin"/>
      </div>

      <div>
        <label htmlFor="password" className='block'>Contraseña</label>
        <Input type="password" name='password' id="password" />
      </div>
      
      { errors ?
        <ul>
          {errors.map((error, index) => <li key={index}>{error.msg}</li>)}
        </ul> :
        ""
      }
      <div className="flex justify-center">
        <Button>Iniciar sesión</Button>
      </div>
    </ ModalForm>
  )
}

export default Login