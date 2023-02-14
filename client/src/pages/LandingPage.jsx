import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

function LandingPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem-7rem)] md:flex-row md:min-h-[calc(100vh-4rem-8rem)] bg-teal-50">
        <div className='max-w-md m-5 border-gray-300 shadow-md border-2 rounded-xl p-3'>
          <h1 className='text-3xl font-bold text-center mb-5'>¡Crea tus "to-do list" aquí!</h1>
          <p>Crea listas de pendientes (o to-do list) y guárdalas en un lugar seguro que podrás consultar cuando quieras y donde quieras. Tienes la posibilidad de crear múltiples listas y marcarlas como completadas en todo momento.</p>
        </div>
        <div className=" border-gray-300 shadow-md border-2 rounded-xl p-3 w-44 h-44 md:w-80 md:h-80 md:m-0">
          <HiOutlineClipboardDocumentList className='w-full h-full' />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
