import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.scss'
import App from './App'
import NotFoundPage from './components/pages/notFoundPage/NotFoundPage';
import SortingPage from './components/pages/sortingPage/SortingPage';
import PathFindingPage from './components/pages/pathFindingPage/PathFindingPage';
import RayTracingPage from './components/pages/rayTracingPage/RayTracing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFoundPage />
  },
  {
    path: "/project",
    children: [
      {
        path: "/project/sorting",
        element: <SortingPage></SortingPage>
      },
      {
        path: "/project/Path-Finding",
        element: <PathFindingPage></PathFindingPage>,
      },
      {
        path: "/project/Ray-Tracer",
        element: <RayTracingPage></RayTracingPage>,
      }
    ]
    
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
