import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NotFound from 'pages/NotFound'
import Dashboard from 'pages/Dashboard'
import MainLayout from 'layouts/MainLayout'

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <div className='App'>
      <ToastContainer />
      <MainLayout>{elements}</MainLayout>
    </div>
  )
}

export default App
