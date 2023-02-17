import {useRouteError} from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError();
  console.error(error)

  return (
    <div className='text-center flex flex-col gap-5'>
      <h1 className='text-4xl font-bold text-red-500 md:text-5xl'>Ha ocurrido un error</h1>
      <p className='text-xl font-bold md:text-2xl'>{error.message || error.statusText || "Error"}</p>
    </div>
  )
}

export default ErrorPage