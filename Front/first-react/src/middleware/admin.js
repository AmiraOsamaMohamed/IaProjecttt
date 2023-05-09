import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../Storage/Storage";

const Admin = () => {
  const auth = getAuthUser();
  
  // return <>{auth && auth.type === 1 ? <Outlet /> : <Navigate to={"/"} />}</>;
  return(<Outlet/>);
};

export default Admin;