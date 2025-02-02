import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import AddProduct from '../pages/AddProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/add-product',
    element: <AddProduct />
  },
//   {
//     path: '/products',
//     element: <Products />,
//   },
])

export function Router() {
  return <RouterProvider router={router} />
}