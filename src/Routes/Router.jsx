import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "../Routes/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "./../PrivateRoute/PrivateRoute";
import BookParcel from "../Dashboard/BookParcel/BookParcel";
import MyParcels from "../Dashboard/MyParcels/MyParcels";
import MyProfile from "../Dashboard/MyProfile/MyProfile";
import ParcelUpdate from "../Dashboard/MyParcels/ParcelUpdate";
import Statistics from "../Dashboard/Statistics/Statistics";
import AllParcels from "../Dashboard/AllParcels/AllParcels";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import AllDeliveryMen from "../Dashboard/AllDeliveryMen/AllDeliveryMen";
import MyDeliveryList from "../Dashboard/MyDeliveryList/MyDeliveryList";
import MyReviews from "../Dashboard/MyReviews/MyReviews";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import Payments from "../Components/Payments/Payments";
import DeliveryManSecure from "../DeliveryManSecure/DeliveryManSecure";
import DashBoardNavigate from "../Components/DashBoardNavigate/DashBoardNavigate";
import AdminSecureRoute from "../Components/AdminSecureRoute/AdminSecureRoute";
import SuccessPayment from "../Components/Payments/SuccessPayment";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <DashBoardNavigate />,
      },
      {
        path: "/dashboard/bookParcel",
        element: <BookParcel />,
      },
      {
        path: "/dashboard/myParcel",
        element: <MyParcels />,
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`https://transcreaw.vercel.app/paymentOne/${params.id}`),
        element: <Payments />,
      },
      {
        path: "/dashboard/successPayment",
        element: <SuccessPayment />,
      },
      {
        path: "/dashboard/myDeliveryList",
        element: (
          <DeliveryManSecure>
            <MyDeliveryList />
          </DeliveryManSecure>
        ),
      },
      {
        path: "/dashboard/myReviews",
        element: (
          <DeliveryManSecure>
            <MyReviews />
          </DeliveryManSecure>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <AdminSecureRoute>
            <Statistics />
          </AdminSecureRoute>
        ),
      },
      {
        path: "/dashboard/allParcels",
        element: (
          <AdminSecureRoute>
            <AllParcels />
          </AdminSecureRoute>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminSecureRoute>
            <AllUsers />
          </AdminSecureRoute>
        ),
      },
      {
        path: "/dashboard/allDeliveryMen",
        element: (
          <AdminSecureRoute>
            <AllDeliveryMen />
          </AdminSecureRoute>
        ),
      },
      {
        path: "/dashboard/parcelUpdate/:id",
        element: <ParcelUpdate />,
        loader: ({ params }) =>
          fetch(`https://transcreaw.vercel.app/bookDetails/${params.id}`),
      },
      {
        path: "/dashboard/myProfile",
        element: <MyProfile />,
      },
    ],
  },
]);

export default Router;
