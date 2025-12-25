import NotFound from 'pages/NotFound'
import Dashboard from 'pages/Dashboard'
import MainLayout from 'layouts/MainLayout'
import About from 'pages/About'
import Students from 'pages/Students'
import AddStudent from 'pages/AddStudent'
import { useRoutes } from 'react-router-dom'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Spinner from 'components/Spinner'

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/students',
      element: <Students />
    },
    {
      path: '/students/:id',
      element: <AddStudent />
    },
    {
      path: '/students/add',
      element: <AddStudent />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  console.log('isFetching', isFetching)
  console.log('isMutating', isMutating)

  return (
    <div className='App'>
      {isFetching + isMutating > 0 && <Spinner />}
      <MainLayout>{elements}</MainLayout>
    </div>
  )
}

export default App
