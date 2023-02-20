function CardHome ({children, customClasses=null}) {
  return (
    <div className="pb-9 md:pb-0">
      <div className={`border-2 border-teal-800 rounded-3xl p-2 w-3/4 max-w-sm h-48 mx-auto grid grid-rows-[70%_auto] shadow-xl ${customClasses && customClasses}`}>
        {children}
      </div>
    </div>
  )
}

export default CardHome