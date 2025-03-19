import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserDashboard from "./UserDashboard";

/**
 * @description This page will handle showing the appropriate dashboard based on the profile we logged in with.
 * If logged in as an user, it shows the user dashboard. If logged in as a admin, it shows the admin dashboard.
 */
type TDesignation = 'Patient' | 'Doctor';

const Home: React.FC = () => {
  // Use store to get the user role
  const {user} = useSelector((state: RootState) => state.auth.userInfo);

  if (!user || !user.role) {
    return <div>Loading...</div>;
  }

  const designation: TDesignation = user.role;

  return (
    <div className="overflow-auto">
      {designation === "Patient" ? <UserDashboard /> : ""}
    </div>
  );
}

export default Home;