- `import { BrowserRouter } from 'react-router-dom'`: Đoạn mã này import component `BrowserRouter` từ package `react-router-dom`. Component `BrowserRouter` cung cấp routing cho ứng dụng, cho phép điều hướng và hiển thị các thành phân tương ứng với các URL khác nhau.

- `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'`: Package này cung cấp các công cụ để quản lý và thực hiện các truy vấn dữ liệu trong ứng dụng React.

- `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'`: Component này cung cấp một công cụ gỡ lỗi và theo dõi trạng thái và hoạt động của React Query trong quá trình phát triển.

- ✅ Tóm lại:

- `QueryClient` được sử dụng để quản lý state của React Query trong ứng dụng.
- `defaultOptions` là một option mặc định được sử dụng cho các query trong React Query.
- `refetchOnWindowFocus` được đặt thành `false` để tránh việc `refetch` các query khi `focus` vào cửa sổ trình duyệt. (có nghĩa là khi ta click vào màn hình của app chúng ta, thì nó sẽ không refetch lại các query)

## refetchOnWindowFocus mặc định là true à ?

- `refetchOnWindowFocus` là một thuộc tính của hook `useQuery` trong thư viện React Query. Theo mặc định, giá trị của `refetchOnWindowFocus` là `true`.

- Khi `refetchOnWindowFocus` được đặt thành `true`, khi người dùng quay lại tab hoặc cửa sổ chứa trang web, React Query sẽ tự động `refetch` lại dữ liệu nếu thời gian từ lần fetch cuối cùng đã vượt qua thời gian `staleTime` được định nghĩa trong query.

- `<ReactQueryDevtools initialIsOpen={false} />`: Đây là một thành phần được cung cấp bởi thư viện `@tanstack/react-query-devtools`. Nó cung cấp một giao diện người dùng để theo dõi và kiểm soát các truy vấn và tương tác của ứng dụng với dữ liệu bằng React Query. Trong đoạn mã này, `initialIsOpen` được đặt là `false`, tức là công cụ `Devtools` sẽ không được mở ban đầu.

👉 Đoạn 4:

```jsx
reportWebVitals()
```

- `reportWebVitals()`: Đoạn mã này gọi hàm `reportWebVitals` để bắt đầu đo lường hiệu suất trong ứng dụng . Các kết quả sẽ được gửi đến bộ ghi nhận hiệu suất (performance recorder) để phân tích và theo dõi/

👉 Tóm lại, đoạn mã trên cấu hình và khởi tạo ứng dụng React, bao gồm việc thiết lập định tuyến, quản lý trạng thái truy vấn dữ liệu bằng React Query, và kết nối các thành phần giao diện người dùng lên cây DOM. Nó cũng bao gồm việc đo lường hiệu suất và cung cấp công cụ DevTools để giám sát và kiểm tra các truy vấn và tương tác với dữ liệu.
