import Home from "./ui/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/appLayout";
import Error from "./ui/error";
import "./index.css";
import Cart from "./features/cart/cart";
import Login from "./features/users/login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Edit from "./features/users/edit";
import OrderList from "./features/orders/orderList";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <Error />,
      },
      {
        path: "/Orders",
        element: <OrderList />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {

    path: "/Edit",
    element:(
       <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
