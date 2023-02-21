function Input({type, id, name, defaultValue = null}) {
  return (
    <input type={type} id={id} name={name} className="border-gray-300 shadow-sm border-2 rounded-md p-1 w-full" defaultValue={defaultValue} />
  )
}

export default Input