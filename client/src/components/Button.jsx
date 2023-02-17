function Button({children, onClick, customClasses=null}) {
  return (
    <button className={`border-2 border-teal-100 p-2 rounded-xl bg-teal-400 text-white shadow-lg transition-all hover:bg-teal-600 ${customClasses && customClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button