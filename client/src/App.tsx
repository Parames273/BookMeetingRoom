import { ToastContainer } from "react-toastify"
import { RouteContainer } from "./routes"

/**
 * @returns RoutesContainer and Configuration of ToastContainer (For showing toast messages to user)
 */
const App: React.FC = () => {
  return (
    <>
      <RouteContainer data-testid="route-container"/>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default App
