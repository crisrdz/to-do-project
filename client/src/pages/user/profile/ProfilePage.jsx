import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Title from "../../../components/ui/Title";

function ProfilePage() {
  const user = useOutletContext();
  const roles = user.roles.map((role) => role.name);
  const navigate = useNavigate()

  return (
    <>
      <Title>
        <AiOutlineUser />
        Perfil
      </Title>
      <div className="border-2 border-blue-100 rounded-2xl p-2 w-4/5 max-w-md mx-auto bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center m-2 items-center">
            <AiOutlineUser className="border-4 border-blue-300 rounded-full text-6xl text-blue-300 md:border-6 md:text-9xl" />
          </div>
          <div className="my-2 w-full flex flex-col justify-center">
            <div className="text-center text-xl font-bold">
              {user.username}
            </div>
            <div className="text-center text-lg">
              {user.email}
            </div>
            <div className="flex justify-center m-2">
              <Button onClick={() => navigate("edit")} customClasses="bg-blue-400 hover:bg-blue-800 border-blue-200 w-16">Editar</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
