function Button({children, onClick, customClasses = null}) {
  return (
    <button className={`border-2 p-2 rounded-xl transition-all text-white shadow-lg ${customClasses ? customClasses : "border-teal-100  bg-teal-400 hover:bg-teal-600"}`} onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default Button