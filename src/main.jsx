import { useState, createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes/routes';
import App from './App.jsx'
import Login from './Login.jsx'
import { UserProvider } from './UserContext.jsx'
import SignUp from './SignUp.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <App/> </ProtectedRoute>,
    children: routes
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <ProtectedRoute users={["admin"]}> <SignUp/> </ProtectedRoute>,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} >
        {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
      </RouterProvider>
    </UserProvider>
  </StrictMode>,
)
