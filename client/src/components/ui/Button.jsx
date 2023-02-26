function Button({children, onClick, customClasses = null, type="submit", isSubmitting = false, submittingClasses = null}) {
  return (
    <button className={`border-2 p-2 rounded-xl transition-all text-white shadow-lg ${isSubmitting ? submittingClasses ? submittingClasses : "bg-teal-600" : customClasses ? customClasses : "border-teal-100  bg-teal-400 hover:bg-teal-600"}`} onClick={onClick} type={type} disabled={isSubmitting && true}>
      {children}
    </button>
  )
}

export default Button