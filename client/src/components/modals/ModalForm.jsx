import { Form } from "react-router-dom"

function ModalForm({children, method, action, title }) {
  return (
    <Form 
      method={method}
      action={action}
      className="absolute z-10 top-1/4 -translate-y-1/4 left-1/2 -translate-x-1/2 bg-white text-black border-gray-300 shadow-md border-2 rounded-xl p-3 flex flex-col gap-2 w-10/12 max-w-md md:top-1/2 md:-translate-y-1/2"
    >

      <h3 className="text-center font-bold text-xl">{title}</h3>

      {children}
      
    </Form>
  )
}

export default ModalForm