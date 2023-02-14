import { Form, redirect, useActionData } from 'react-router-dom'
import { login } from '../../api/auth.js'

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


function LogIn ({ hidden }) {
  const errors = useActionData()

  return (
    <Form 
      method='post'
      action='/login'
      className={hidden ? "hidden" : ""}
    >
      <div>
        <label htmlFor="emailLogin">Correo electrónico</label>
        <input type="text" name='email' id="emailLogin"/>
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input type="password" name='password' id="password" />
      </div>
      
      { errors ?
        <ul>
          {errors.map(error => <li key={error.param}>{error.msg}</li>)}
        </ul> :
        ""
      }
      <div>
        <button>Iniciar sesión</button>
      </div>
    </Form>
  )
}

export default LogIn