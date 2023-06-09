
import { createBrowserRouter } from "react-router-dom";
import HomePage from"../src/Enter our site/home/HomePage";
import App from "./App";
import Signup from "./Enter our site/signup/Signup";
import Login from "./Enter our site/Login/Login";
import NotFound from "./component/NotFound/NotFound";
import ContactUs from "./Enter our site/Contact Us/ContactUs";
import AboutUs from "./Enter our site/AboutUs/AboutUs";

import ManageJobs from "./Abmin/manageJobs/ManageJobs"
import UpdateJob from "./Abmin/manageJobs/UpdateJob";
import AddJob from "./Abmin/manageJobs/AddJob";
import ManageUsers from "./Abmin/manageUsers/ManageUsers";
import UpdateUser from "./Abmin/manageUsers/UpdateUser";
import AddUser from "./Abmin/manageUsers/AddUser";
import Guest from "./middleware/admin";
import Admin from "./middleware/admin";
import GetUser from "./Abmin/manageJobs/GetUser";
export const router =createBrowserRouter([
        {
          path: "",
          element: <App />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            
      
            // GUEST MIDDLEWARE
            {
              element: <Guest />,
              children: [
                {
                  path: "/login",
                  element: <Login />,
                },
                {
                  path: "/Signup",
                  element: <Signup />,
                },
                {
                  path: "/ContactUs",
                  element: <ContactUs />,
                },
                {
                  path: "/AboutUs",
                  element: <AboutUs />,
                },
              ],
            },
            {
              path: "/manageJobs",
              element: <Admin />,
              children: [
                {
                  path: "",
                  element: <ManageJobs />,
                },
                {
                  path: "AddJob",
                  element: <AddJob />,
                },
                {
                  path: "GetUser",
                  element: <GetUser />,
                },
                {
                  path: ":id",
                  element: <UpdateJob />,
                },
                
              ],
            },
            {
              path: "/manageUsers",
              element: <Admin />,
              children: [
                {
                  path: "",
                  element: <ManageUsers />,
                },
                {
                  path: "AddUser",
                  element: <AddUser />,
                },
                {
                  path: ":id",
                  element: <UpdateUser />,
                },
              ],
            },
          ],
        },
    {
     
      path: '*',
      element: <NotFound />,
  }
  ],
)



