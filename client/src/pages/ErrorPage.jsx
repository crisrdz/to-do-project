import {useRouteError} from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError();
  console.error(error)

  return (
    <div>
      <h1>Ha ocurrido un error</h1>
      <p>{error.message || error.statusText}</p>
    </div>
  )
}

export default ErrorPage