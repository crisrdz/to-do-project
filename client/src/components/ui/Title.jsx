function Title({ children, className }) {
  return (
    <h2 className={"text-center text-4xl font-bold p-3 flex w-full justify-center items-center gap-2 " + className}
    >
      {children}
    </h2>
  )
}

export default Title