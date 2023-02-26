import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Form, Link, useNavigation, useSubmit } from "react-router-dom";
import ModalConfirm from "../modals/ModalConfirm";
import Button from "./Button";

function ShortList({ list }) {
  const date = new Date(list.createdAt).toLocaleDateString()
  const submit = useSubmit()
  const navigation = useNavigation()
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
      <div className="border-2 border-gray-400 rounded-xl p-2 my-2 mx-auto w-3/4 max-w-xs bg-white">
        <h3 className="text-center font-bold border-t-2 border-gray-200">
          {list.name}
        </h3>
        <div className="text-center text-sm border-t-2 border-gray-200">{list.completed ? <p className="text-green-500">Completada</p> : <p className="text-red-500">No completada</p>}</div>
        <p className="text-center text-sm border-t-2 border-gray-200 text-gray-500">Creada el: {date}</p>
        <div className="border-y-2 border-gray-200 py-3 px-1 text-sm flex justify-around">
          {
            navigation.state === "submitting" ?
              <Button isSubmitting={true} submittingClasses="bg-blue-600"><AiOutlineLoading className='text-xl animate-spin' /></Button>
              :
              <>
                <Button customClasses="bg-blue-400 border-blue-300 hover:bg-blue-600">
                  <Link to={list._id} className="w-full">Ver detalles</Link>
                </Button>
                <Form 
                  className="inline"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setModalProps({
                      show: true,
                      eventTarget: e.currentTarget,
                      options: {
                        action: `/user/lists/${list._id}/delete`,
                        method: "delete"
                      },
                      messages: {
                        main: "¿Estás seguro de que deseas eliminar esta lista?",
                        optional: "Esta acción es irreversible"
                      }
                    })
                  }}
                >
                  <Button customClasses="bg-red-400 border-red-300 hover:bg-red-600">Eliminar lista</Button>
                </Form>
              </>
          }
          
        </div>
      </div>
      {
        modalProps.show &&
          <ModalConfirm 
            close={() => setModalProps({...modalProps, show: false})}
            confirm={() => {
              submit(modalProps.eventTarget, modalProps.options)
            }}
          >
            <p className="text-center">{modalProps.messages.main}</p>
            {!!modalProps.messages.optional && <p className="text-red-400 text-center">{modalProps.messages.optional}</p>}
          </ModalConfirm>
      }
    </>
  );
}

export default ShortList;
