import Button from '../ui/Button'

function ModalConfirm({ children, confirm, close }) {

  function handleConfirm(){
    confirm()
    close()
  }

  function handleCancel(){
    close()
  }

  return (
    <>
      <div className="border-2 border-gray-200 rounded-xl left-1/2 -translate-x-1/2 bg-gray-50 p-4 z-50 fixed top-1/2 -translate-y-1/2 flex flex-col gap-3" >
        <div>
          {children}
        </div>
        <div className='flex justify-around'>
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button onClick={handleCancel} customClasses="bg-red-400 hover:bg-red-600 border-red-300">Cancelar</Button>
        </div>
      </div>
      <div className='z-40 bg-[rgb(0,0,0,0.5)] fixed h-screen w-screen top-0 left-0'></div>
    </>
  )
}

export default ModalConfirm