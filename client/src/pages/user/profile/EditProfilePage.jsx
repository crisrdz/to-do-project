import { AiOutlineLoading, AiOutlineUser } from 'react-icons/ai';
import { Form, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import { updateUser } from "../../../api/user";
import Title from '../../../components/ui/Title';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
  const navigation = useNavigation()

  return (
    <>
      <div className='text-sm ml-3 mt-3 md:absolute md:left-4 md:top-4 md:m-0'>
        <Button 
          onClick={() => navigate("/user/profile")}
          customClasses="bg-cyan-500 border-cyan-400 hover:bg-cyan-700"
        >
          Volver al perfil
        </Button>
      </div>
      <Title>
        <AiOutlineUser />
        Editar perfil
      </Title>
      <Form
        method="put"
        className="flex flex-col gap-1 border-2 border-blue-100 rounded-2xl p-2 w-4/5 max-w-md mx-auto bg-gray-50 text-lg mb-6"
      >
        <div>
          <label htmlFor="username">Nombre de usuario: </label>
          <Input type="text" name="username" id="username" />
          <p className="text-red-500 text-sm">{errors?.find(error => error.param === "username")?.msg}</p>
        </div>

        <div>
          <label htmlFor="email">Correo electrónico: </label>
          <Input type="text" name="email" id="email" />
          <p className="text-red-500 text-sm">{errors?.find(error => error.param === "email")?.msg}</p>
        </div>
        
        <div>
          <label htmlFor="passwordOne">Contraseña: </label>
          <Input type="password" name="passwordOne" id="passwordOne" />
          <p className="text-red-500 text-sm">{errors?.find(error => error.param === "passwordOne")?.msg}</p>
        </div>
        
        <div>
          <label htmlFor="passwordTwo">Confirmar contraseña: </label>
          <Input type="password" name="passwordTwo" id="passwordTwo" />
          <p className="text-red-500 text-sm">{errors?.find(error => error.param === "passwordTwo")?.msg}</p>
        </div>
        
        <div>
          <label htmlFor="passwordOld">Contraseña anterior: </label>
          <Input type="password" name="passwordOld" id="passwordOld" />
          <p className="text-red-500 text-sm">{errors?.find(error => error.param === "passwordOld")?.msg}</p>
        </div>

        <div className='flex justify-center my-2'>
          {navigation.state === "submitting" ? <Button isSubmitting={true} submittingClasses="bg-blue-800 hover:bg-blue-800"><AiOutlineLoading className='text-xl animate-spin'/></Button> : <Button customClasses="bg-blue-400 hover:bg-blue-800 border-blue-200">Editar</Button>}
        </div>
      </Form>
    </>
  )
}

export default EditProfilePage