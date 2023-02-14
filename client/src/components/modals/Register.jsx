import { Form, redirect, useActionData } from "react-router-dom";
import { register } from "../../api/auth";

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

function Register({ hidden }) {
  let errors = useActionData()

  return (
    <Form 
      method="post"
      action="/register"
      className={hidden ? "hidden" : ""}
    >
      <div>
        <label htmlFor="emailRegister">Email</label>
        <input type="text" name="email" id="emailRegister" />
      </div>

      <div>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" name="username" id="username" />
      </div>

      <div>
        <label htmlFor="passwordOne">Contraseña</label>
        <input type="password" name="passwordOne" id="passwordOne" />
      </div>

      <div>
        <label htmlFor="passwordTwo">Confirmar contraseña</label>
        <input type="password" name="passwordTwo" id="passwordTwo" />
      </div>

      {errors ?
        <ul>
          {errors.map(error => <li key={error.param}>{error.msg}</li>)}
        </ul> :
        ""
      }

      <button>Registrarse</button>
    </Form>
  )
}

export default Register