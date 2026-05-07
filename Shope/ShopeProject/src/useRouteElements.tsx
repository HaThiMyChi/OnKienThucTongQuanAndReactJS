import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <RegisterLayout />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}
