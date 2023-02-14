import { useLoaderData, useNavigate } from "react-router-dom";
import { getUser } from "../../../api/user";

export async function loader() {
  const token = window.localStorage.getItem("token");
  const response = await getUser(token);

  if (!response.data.success) {
    throw new Error("Error al leer los datos del usuario");
  }

  return response.data.user;
}

function ProfilePage() {
  const user = useLoaderData();
  const roles = user.roles.map((role) => role.name);
  const navigate = useNavigate()

  return (
    <>
      <div>ProfilePage</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>Roles: </div>
      <ul>
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
      <button onClick={() => navigate("edit")}>Editar</button>
    </>
  );
}

export default ProfilePage;
