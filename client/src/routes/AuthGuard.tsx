import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const  authentication  = useSelector((state:RootState)=> state.auth.isAuthenticated);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authentication);
 
	useEffect(() => {
		const handleStorageChange = () => {
			setIsAuthenticated(authentication);
		}
		window.addEventListener("storage", handleStorageChange);

		return () => (
			window.removeEventListener("storage", handleStorageChange)
		)
	}, [authentication])

	return isAuthenticated ? children : <Navigate to="/" replace />
}

export default AuthGuard;