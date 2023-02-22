import { Form, redirect, useLoaderData } from "react-router-dom";
import { changeRole, disableUser, enableUser, getUsers } from "../../../api/user";
import Title from "../../../components/ui/Title";
import ActionButton from "../../../components/ui/ActionButton";

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

  return (
    <>
      <Title>Admin dashboard</Title>
      <div className="relative">
        <div className="overflow-auto">
          <table className="border-2 border-gray-400 w-11/12 mx-auto">
            <thead>
              <tr>
                <th className="border-2 border-gray-400">Nombre de usuario</th>
                <th className="border-2 border-gray-400">Correo electrónico</th>
                <th className="border-2 border-gray-400">Registrado en</th>
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
                  <td className="border-2 border-gray-400">{user.enabled.toString()}</td>
                  <td className="border-2 border-gray-400">
                    {
                      user.enabled ?
                      <Form
                        method="put"
                        action="disable"
                      >
                        <input type="hidden" className="hidden" name="userId" value={user._id} />
                        <ActionButton customClasses="border-red-300 bg-red-400 hover:bg-red-600">
                          Deshabilitar
                        </ActionButton>
                      </Form>
                    :
                    <Form
                      method="put"
                      action="enable"
                    >
                      <input type="hidden" className="hidden" name="userId" value={user._id} />
                      <ActionButton customClasses="border-green-300 bg-green-400 hover:bg-green-600">
                        Habilitar
                      </ActionButton>
                    </Form>
                    }
                    <Form
                      method="put"
                    >
                      <input type="hidden" className="hidden" name="userId" value={user._id} />
                      <ActionButton customClasses="border-gray-500 bg-gray-700 hover:bg-gray-900">
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
    </>
  );
}

export default AdminPage;
