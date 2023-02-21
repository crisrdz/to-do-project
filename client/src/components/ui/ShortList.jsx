import { Form, Link } from "react-router-dom";
import Button from "./Button";

function ShortList({ list }) {
  const date = new Date(list.createdAt).toLocaleDateString()
  
  return (
    <div className="border-2 border-gray-400 rounded-xl p-2 my-2 mx-auto w-3/4 max-w-xs bg-white">
      <h3 className="text-center font-bold border-t-2 border-gray-200">
        {list.name}
      </h3>
      <p className="text-center text-sm border-t-2 border-gray-200 text-gray-500">Creada el: {date}</p>
      <div className="border-y-2 border-gray-200 py-3 px-1 text-sm flex justify-around">
        <Button customClasses="bg-blue-400 border-blue-300 hover:bg-blue-600">
          <Link to={list._id} className="w-full">Ver detalles</Link>
        </Button>
        <Form action={`${list._id}/delete`} method="DELETE" className="inline">
          <Button customClasses="bg-red-400 border-red-300 hover:bg-red-600">Eliminar lista</Button>
        </Form>
      </div>
    </div>
  );
}

export default ShortList;
