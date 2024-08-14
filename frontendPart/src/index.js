import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./Components/AppContext";
import Home from "./Components/Home";
import Dashboard from "./Components/Principal/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import SDashboard from "./Components/Student/SDashboard";
import TDashboard from "./Components/Teacher/TDashboard";
// import './index.css';

const root = ReactDom.createRoot(document.getElementById('root'));

const allRoutes = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin',
        element: <Dashboard />
      },
      {
        path: 'teacher',
        element: <TDashboard />
      },
      {
        path: 'student',
        element: <SDashboard />
      },
    ]
  },
  {
    path: '*',
    element: <Home />
  },
])

root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={allRoutes} />
    </ContextProvider>
  </React.StrictMode>
)


























// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Home from './Components/Home';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// let allRoutes = createBrowserRouter(
//   [
//     // Static routs 
//     {
//       path: '/',
//       element: <Home/>
//     }
//   ]
// )

// root.render(
//   <React.StrictMode>
//     <RouterProvider router={allRoutes} />
//   </React.StrictMode>

// );