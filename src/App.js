import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/appLayout";
import Error from "./ui/error";
import "./index.css";
import ProtectedRoute from "./ui/ProtectedRoute";
import { lazy, Suspense } from 'react';
import Loader from './ui/loader';

const Home = lazy(() => import('./ui/home'));
const Cart = lazy(() => import('./features/cart/cart'));
const Login = lazy(() => import('./features/users/login'));
const Edit = lazy(() => import('./features/users/edit'));
const OrderList = lazy(() => import('./features/orders/orderList'));

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
        element: <Suspense fallback={<Loader />}><Home /></Suspense>,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Suspense fallback={<Loader />}><Cart /></Suspense>,
        errorElement: <Error />,
      },
      {
        path: "/Orders",
        element: <Suspense fallback={<Loader />}><OrderList /></Suspense>,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Suspense fallback={<Loader />}><Login /></Suspense>,
    errorElement: <Error />,
  },
  {

    path: "/Edit",
    element:(
       <ProtectedRoute>
        <Suspense fallback={<Loader />}><Edit /></Suspense>
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
