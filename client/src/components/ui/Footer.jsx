import {AiOutlineLinkedin, AiOutlineGithub} from 'react-icons/ai'

function Footer() {
  return (
    <footer
      className="relative h-28 w-full bg-teal-800 text-teal-50 text-xs flex justify-center items-center text-center border-opacity-40 border-t-teal-900 border-t-4 md:h-32 md:text-sm"
    >
      <div className='flex flex-col gap-1'>
        <h5>Desarrollado por Cristofer Rodríguez</h5>
        <h6>Desarrollador Web</h6>
        <div className='flex justify-center text-2xl gap-2 mt-1'>
          <a href="https://github.com/crisrdz" target="_blank"><AiOutlineGithub /></a>
          <a href="https://www.linkedin.com/in/cristofer-rodriguez-a49275254/" target="_blank"><AiOutlineLinkedin /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer