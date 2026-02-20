
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";
import Dashboard from "./pages/dashboard.page";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/login",
      element: <Login />,
    },
    {
      path: "/user/register",
      element: <Register />,
    },
    {
      path: "/user/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      <RouterProvider router={router} />
    </div>
  )
}

export default App