function ActionButton({children, customClasses}) {
  return (
    <button className={`border-2 rounded-xl py-0.5 px-1.5 text-white ${customClasses}`}>
      {children}
    </button>
  )
}

export default ActionButton