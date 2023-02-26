import { Form, redirect, useLoaderData, useNavigate, useNavigation, useOutletContext, useSubmit } from "react-router-dom";
import { changeRole, disableUser, enableUser, getUsers } from "../../../api/user";
import Title from "../../../components/ui/Title";
import ActionButton from "../../../components/ui/ActionButton";
import { AiFillCaretLeft, AiFillCaretRight, AiFillCheckCircle, AiFillCloseCircle, AiOutlineLoading, AiOutlineLock } from "react-icons/ai";
import ModalConfirm from "../../../components/modals/ModalConfirm";
import { useState } from "react";
import Button from "../../../components/ui/Button";

export async function loader ({ request }) {
  const token = window.localStorage.getItem("token")
  const currentPage = new URL(request.url).searchParams.get("page")

  let response
  if(!currentPage || parseInt(currentPage) < 1){
    return redirect("/user/admin?page=1")
  }else{
    response = await getUsers(token, currentPage);
  }

  if(response.data.users.length === 0 && currentPage > 1) return redirect("/user/admin?page=1")

  return response.data.users;
}

export async function actionChangeRole ({ request }) {
  if(request.method === "PUT"){
    const token = window.localStorage.getItem("token")
    const form = await request.formData()
    await changeRole(token, {
      userId: form.get("userId")
    })
  }

  return redirect("/user/admin")
}

export async function actionDisableUser ({ request }) {
  if (request.method === "PUT") {
    const token = window.localStorage.getItem("token")
    const form = await request.formData()
    await disableUser(token, {
      userId: form.get("userId")
    })
  }

  return redirect("/user/admin")
}

export async function actionEnableUser ({ request }) {
  if (request.method === "PUT") {
    const token = window.localStorage.getItem("token")
    const form = await request.formData()
    await enableUser(token, {
      userId: form.get("userId")
    })
  }

  return redirect("/user/admin")
}

function AdminPage() {
  const users = useLoaderData();
  const userLogged = useOutletContext()
  const submit = useSubmit()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const currentPage = parseInt(new URL(window.location).searchParams.get("page"))

  const [modalProps, setModalProps] = useState({
    show: false,
    eventTarget: null,
    options: null,
    messages: {
      main: null
    }
  })

  return (
    <>
      {navigation.state === "submitting" && 
        <div className="z-50 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full">
          <div className="fixed left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2"><AiOutlineLoading className="text-3xl text-white animate-spin" /></div>
        </div>
      }
      <Title><AiOutlineLock />{userLogged.roles.some(role => role.name === "admin") ? "Admin dashboard" : "Moderador dashboard"}</Title>
      <div className="relative mx-2">
        <div className="overflow-auto">
          <table className="border-2 border-gray-400 w-11/12 mx-auto bg-gray-50 text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-gray-400">Nombre de usuario</th>
                <th className="border-2 border-gray-400">Correo electrónico</th>
                <th className="border-2 border-gray-400">Registrado el</th>
                <th className="border-2 border-gray-400">Cantidad de listas</th>
                <th className="border-2 border-gray-400">Roles</th>
                <th className="border-2 border-gray-400">Habilitado</th>
                <th className="border-2 border-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border-2 border-gray-400">{user.username}</td>
                  <td className="border-2 border-gray-400">{user.email}</td>
                  <td className="border-2 border-gray-400">{new Date (user.createdAt).toLocaleDateString()}</td>
                  <td className="border-2 border-gray-400">{user.listCount}</td>
                  <td className="border-2 border-gray-400">
                    <ul>
                      {user.roles.map((role, index) => 
                        <li key={index}>{role.name}</li>
                      )}
                    </ul>
                  </td>
                  <td className="border-2 border-gray-400">{user.enabled ? <AiFillCheckCircle className="text-2xl text-green-500 text-center w-full" /> : <AiFillCloseCircle className="text-2xl text-red-500 text-center w-full" />}</td>
                  <td className="border-2 border-gray-400 p-1">
                    {
                      user.enabled ?
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault()
                          setModalProps({eventTarget: e.currentTarget, show: true, options: {
                            method: "put",
                            action: "/user/admin/disable"
                          }, messages: {
                            main: "¿Estás seguro de que quieres deshabilitar este usuario?"
                          }})
                        }}
                      >
                        <input type="hidden" className="hidden" name="userId" value={user._id} />
                        <ActionButton customClasses="border-red-300 bg-red-400 hover:bg-red-600 m-0.5">
                          Deshabilitar
                        </ActionButton>
                      </Form>
                    :
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setModalProps({eventTarget: e.currentTarget, show: true, options: {
                          method: "put",
                          action: "/user/admin/enable"
                        }, messages: {
                          main: "¿Estás seguro de que quieres habilitar este usuario?"
                        }})
                      }}
                    >
                      <input type="hidden" className="hidden" name="userId" value={user._id} />
                      <ActionButton customClasses="border-green-300 bg-green-400 hover:bg-green-600 m-0.5">
                        Habilitar
                      </ActionButton>
                    </Form>
                    }
                    {
                      userLogged.roles.some(role => role.name === "admin") &&
                      <Form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setModalProps({eventTarget: e.currentTarget, show: true, options: {
                          method: "put",
                          action: "/user/admin"
                        }, messages: {
                          main: "¿Estás seguro de que quieres dar el rol de moderador a este usuario?",
                          optional: "Esto permitirá que el usuario pueda habilitar y deshabilitar usuarios"
                        }})
                      }}
                    >
                      <input type="hidden" className="hidden" name="userId" value={user._id} />
                      <ActionButton customClasses="border-gray-500 bg-gray-700 hover:bg-gray-900 m-0.5">
                        {user.roles.some(role => role.name === "moderator") ? "Quitar moderador" : "Agregar como moderador"}
                      </ActionButton>
                    </Form>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-2 mb-3">
        {
          currentPage > 1 ?
            <Button onClick={() => navigate(`?page=${currentPage-1}`)} customClasses="bg-blue-500 hover:bg-blue-700 border-blue-400" type="button"><AiFillCaretLeft className="text-xl" /></Button> :
            <Button customClasses="invisible" type="button"><AiFillCaretLeft className="text-xl" /></Button>
        }
        <p className="text-xl bg-blue-500 border-blue-400 text-white rounded-xl flex items-center p-2 border-2">{isNaN(currentPage) ? "1" : currentPage}</p>
        {
          users.length > 6 * currentPage ?
          <Button onClick={() => navigate(`?page=${currentPage+1}`)} customClasses="bg-blue-500 hover:bg-blue-700 border-blue-400" type="button"><AiFillCaretRight className="text-xl" /></Button> :
          <Button customClasses="invisible" type="button"><AiFillCaretRight className="text-xl" /></Button>
        }
      </div>
      {modalProps.show && 
        <ModalConfirm 
          confirm={() => {
            submit(modalProps.eventTarget, modalProps.options)
          }}
          close={() => setModalProps({...modalProps, show: false})}
        >
          <p className="text-center">{modalProps.messages.main}</p>
          {!!modalProps.messages.optional && <p className="text-red-600 text-center">{modalProps.messages.optional}</p>}
        </ModalConfirm>}
    </>
  );
}

export default AdminPage;
