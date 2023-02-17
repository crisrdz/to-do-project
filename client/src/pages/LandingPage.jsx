import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button';

function LandingPage() {

  const handleRegister = useOutletContext()
  
  return (
    <>
      <div className='bg-white max-w-md m-5 border-gray-300 shadow-md border-2 rounded-xl p-3'>
        <h1 className='text-3xl font-bold text-center mb-5'>¡Crea tus "to-do list" aquí!</h1>
        <p>Crea listas de pendientes (o to-do list) y guárdalas en un lugar seguro que podrás consultar cuando quieras y donde quieras. Tienes la posibilidad de crear múltiples listas y marcarlas como completadas en todo momento.</p>
        <div className='flex justify-center mt-4 mb-2'><Button onClick={handleRegister}>¡Empieza ahora!</Button></div>
      </div>
      <div className="bg-white border-gray-300 mb-6 shadow-md border-2 rounded-xl p-3 md:m-0 md:mr-4">
        <HiOutlineClipboardDocumentList className='w-44 h-44 md:w-80 md:h-80' />
      </div>
    </>
  );
}

export default LandingPage;
