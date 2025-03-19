interface AuthWrapperProps {
  children: React.ReactNode
}

/**
 * @param param {AuthWrapperProps} children - the component to render along with the message
 * @returns The navbar with common message & renders the children passed as a prop
 */
const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }: AuthWrapperProps) => {
  return <>
    <nav className="z-10 sticky top-0 w-full h-[3rem] p-4 bg-primary flex items-center justify-center text-Black bg-gradient-to-r bg-green-500, bg-green-600 p-4 flex">
    Health Care <br />
    </nav >
    {children}
  </>
}

export default AuthWrapper;