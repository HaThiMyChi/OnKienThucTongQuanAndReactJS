import { useContext, useEffect } from 'react'
import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouteElements()

  const { reset } = useContext(AppContext)

  //   Lần đầu App render xong
  // → addEventListener('clearLS', reset)

  // Nếu App bị unmount
  // → removeEventListener('clearLS', reset)

  // Nếu reset thay đổi
  // → removeEventListener với reset cũ
  // → addEventListener với reset mới

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  // Listen khi xóa token từ DevTools hoặc tab khác
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' && !e.newValue) {
        // Token bị xóa
        reset()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [reset])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
