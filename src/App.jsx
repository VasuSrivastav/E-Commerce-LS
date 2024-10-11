import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import "./App.css";
import Home from "./components/Home"
import Details from "./components/Details";
import Context from "./utils/Context";
import Create from "./components/Create";
import Edit from "./components/Edit";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/details/:id",
      element: <Details />
    },
    {
      path: "/create",
      element: <Create />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },
  ]
);

function App() {
  return (
    <Context >
      <div className="h-screen w-screen flex">
        
    <RouterProvider router={router} />
    </div>
    <ToastContainer />
      </Context>

  );
}

export default App;
