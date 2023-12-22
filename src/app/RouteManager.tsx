import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landmark from "./pages/Landmark";

function RouterManager() {
  const router = createBrowserRouter([

    {
      path: '/',
      element: <Landmark />,
  },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default RouterManager;