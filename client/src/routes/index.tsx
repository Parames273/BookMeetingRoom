import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ROUTES as ROUTELINKS } from "./Routes"
import AuthGuard from "./AuthGuard";
import Loader from "../components/reusable/Loader";
import RootLayout from "../components/layout/RootLayout";
import AuthWrapper from "../components/layout/AuthWrapper";
import { IRoute } from "../typings";

/**
 * @description RouteContainer - Component responsible to render links and wrapping the components with desired wrapper. The components are rendered lazily.
 * @returns Route 
 */
export const RouteContainer: React.FC = () => {
	return (
		<Router>
			<Routes>
				{
					ROUTELINKS.map((route: IRoute) => {
						const { path, component: Component, protected: isProtected } = route;

						const RouteComponent = isProtected ? (
							<AuthGuard>
								<RootLayout>
									<Component />
								</RootLayout>
							</AuthGuard>
						) : (
							<AuthWrapper>
								<Component />
							</AuthWrapper>
						);

						return (
							<Route
								key={path}
								path={path}
								element={
									<Suspense fallback={<Loader />}>
										{RouteComponent}
									</Suspense>
								}
							/>
						)
					})
				}
			</Routes>
		</Router>
	)
}