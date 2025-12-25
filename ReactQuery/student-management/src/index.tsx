import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//  `QueryClient` được sử dụng để quản lý state của React Query trong ứng dụng.
// - `defaultOptions` là một option mặc định được sử dụng cho các query trong React Query.
// - `refetchOnWindowFocus` được đặt thành `false` để tránh việc `refetch` các query khi `focus` vào cửa sổ trình duyệt. (có nghĩa là khi ta click vào màn hình của app chúng ta, thì nó sẽ không refetch lại các query)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position='top-right' autoClose={3000} />

      {/* - Khi cài ReactQueryDevTool thì trên giao diện sẽ xuất hiện cái logo bông hoa màu đỏ.
       *  - Và đó là cái Dev Tool của React Query
       */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
