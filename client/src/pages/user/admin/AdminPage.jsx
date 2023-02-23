import { Form, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { changeRole, disableUser, enableUser, getUsers } from "../../../api/user";
import Title from "../../../components/ui/Title";
import ActionButton from "../../../components/ui/ActionButton";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import ModalConfirm from "../../../components/modals/ModalConfirm";
import { useState } from "react";

export async function loader () {
  const token = window.localStorage.getItem("token")
  const response = await getUsers(token);

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
  const submit = useSubmit()
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
      <Title>Admin dashboard</Title>
      <div className="relative">
        <div className="overflow-auto">
          <table className="border-2 border-gray-400 w-11/12 mx-auto bg-gray-50 text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-gray-400">Nombre de usuario</th>
                <th className="border-2 border-gray-400">Correo electrónico</th>
                <th className="border-2 border-gray-400">Registrado el</th>
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
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setModalProps({eventTarget: e.currentTarget, show: true, options: {
                          method: "put",
                          action: "/user/admin"
                        }, messages: {
                          main: "¿Estás seguro de que quieres habilitar este usuario?",
                          optional: "Esta acción es irreversible"
                        }})
                      }}
                    >
                      <input type="hidden" className="hidden" name="userId" value={user._id} />
                      <ActionButton customClasses="border-gray-500 bg-gray-700 hover:bg-gray-900 m-0.5">
                        {user.roles.some(role => role.name === "admin") ? "Quitar administrador" : "Agregar como administrador"}
                      </ActionButton>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalProps.show && 
        <ModalConfirm 
          confirm={() => {
            submit(modalProps.eventTarget, modalProps.options)
          }}
          close={() => setModalProps({...modalProps, show: false})}
        >
          <p className="text-center">{modalProps.messages.main}</p>
          {!!modalProps.messages.optional && <p className="text-red-400 text-center">{modalProps.messages.optional}</p>}
        </ModalConfirm>}
    </>
  );
}

export default AdminPage;
