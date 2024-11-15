import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes/routes';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: routes
	},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RouterProvider>
  </StrictMode>,
)
