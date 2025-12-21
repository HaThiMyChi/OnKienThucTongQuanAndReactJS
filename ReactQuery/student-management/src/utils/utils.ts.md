`useQueryString`. Hàm này sử dụng hook `useSearchParams` từ thư viện React Router DOM để lấy thông tin từ các tham số truy vấn (query parameters) trong URL.


- Cách hoạt động của hàm `useQueryString` như sau:

  - Chúng ta sử dụng `useSearchParams()` để lấy đối tượng (object) `searchParams`, đại diện cho các tham số truy vấn trong URL. Đối tượng `searchParams` chứa tất cả các tham số truy vấn dưới dạng một đối tượng URLSearchParams.

  - Chúng ta sử dụng `Object.fromEntries([...searchParams])` để chuyển đổi đối tượng `searchParams` thành một đối tượng JavaScript bình thường. Điều này cho phép chúng ta làm việc với các tham số truy vấn như một đối tượng thông thường.

## Ví dụ về tham số truy vấn trong URL:

- Tôi sẽ cung cấp một ví dụ về các tham số truy vấn trong URL:

- Giả sử URL của trang web của chúng ta là: `https://example.com/products?category=electronics&sort=price.`

- Trong ví dụ này, chúng ta có hai tham số truy vấn:

  - `category`: Tham số này có giá trị là `electronics`. Nó đại diện cho danh mục sản phẩm mà chúng ta muốn hiển thị.

  - `sort`: Tham số này có giá trị là `price`. Nó đại diện cho cách sắp xếp sản phẩm trên trang, trong trường hợp này là theo giá.

- Khi chúng ta sử dụng hàm `useQueryString`, nó sẽ trả về một đối tượng JavaScript có cấu trúc tương tự như sau:

```jsx
{
  category: 'electronics',
  sort: 'price'
}
```

- ✅ Chúng ta có thể sử dụng đối tượng này để điều chỉnh hoặc hiển thị nội dung trên trang web của chúng ta. Ví dụ, chúng ta có thể sử dụng giá trị của `category` để hiển thị danh sách sản phẩm trong danh mục tương ứng và sử dụng giá trị của `sort` để sắp xếp các sản phẩm theo giá trị.

👉 Đoạn 3:

```jsx
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
```

- Trong đoạn code trên, chúng ta định nghĩa một hàm `isAxiosError` có chức năng kiểm tra xem một giá trị có phải là một đối tượng `AxiosError` hay không.

- Đối tượng `AxiosError` là một đối tượng đại diện cho một lỗi xảy ra trong quá trình thực hiện một yêu cầu HTTP bằng thư viện Axios. Nó chứa thông tin về lỗi như mã lỗi, thông báo lỗi, dữ liệu phản hồi (nếu có) và các thông tin khác liên quan đến lỗi.

- Hàm `isAxiosError` nhận một tham số là `error` có kiểu dữ liệu không xác định (`unknown`). Nó sử dụng phương thức `axios.isAxiosError` để kiểm tra xem `error` có phải là một đối tượng `AxiosError` hay không.

- Nếu `error` là một đối tượng `AxiosError`, hàm sẽ trả về giá trị `true`, ngược lại, nó sẽ trả về giá trị `false`.

- Việc sử dụng hàm `isAxiosError` có thể giúp chúng ta xác định và xử lý các lỗi liên quan đến yêu cầu HTTP một cách dễ dàng trong ứng dụng sử dụng thư viện Axios.