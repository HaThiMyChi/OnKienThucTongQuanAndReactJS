## useForm sử dụng trong react hook form

- Cách nhớ nhanh
  register → gắn input vào form
  handleSubmit → submit form
  watch → theo dõi value
  errors → lỗi validation
  reset → reset form
  setValue → set value bằng code
  getValues → lấy value bằng code
  setError → tự set lỗi
  clearErrors → xóa lỗi
  trigger → tự gọi validate
  formState → trạng thái của form

Với form đăng ký, bạn nên nhớ trước 5 cái quan trọng nhất:
register
handleSubmit
errors
watch
isSubmitting

## Khi thêm noValidate

<form noValidate>

Browser sẽ không tự hiện lỗi nữa.

Lúc này mình sẽ để React Hook Form tự validate và tự show lỗi:

# autoComplete="on" → cho browser tự gợi ý / tự điền

autoComplete="off" → hạn chế browser tự điền

# Tóm tắt lợi ích Yup Schema

✅ Tự động type inference - Không cần write types
✅ Pure function - Không phụ thuộc getValues
✅ Dễ đọc & maintain - Fluent API
✅ Reusable - Dùng ở nhiều components
✅ Extensible - Dễ compose, thêm custom validators
✅ Async support - API validation
✅ Better errors - Error handling tốt hơn

# React Query

1. React Query là gì?

React Query là state management cho server data (dữ liệu từ API)

```ts Tính năng Dùng khi nào
useQuery Lấy dữ liệu từ API (GET)
useMutation Tạo/cập nhật/xóa dữ liệu (POST/PUT/DELETE)
invalidateQueries Dữ liệu đã cũ, cần fetch lại
setQueryData Update cache mà không fetch
getQueryData Đọc cache data
refetch Fetch lại query hiện tại

✨ Lợi ích React Query
✅ Tự động cache - Không fetch lặp lại
✅ Background refetch - Cập nhật data tự động
✅ Synchronized state - Tất cả components dùng chung 1 data
✅ Error handling - Tự động retry
✅ DevTools - Debug dễ dàng
✅ Optimistic updates - Update UI trước khi server confirm
```

useQuery({
queryKey: ['products'],
queryFn: () => api.getProducts(),

// 1. refetchOnMount (mặc định: true)
// Fetch khi component mount lần đầu
refetchOnMount: true,

// 2. refetchOnWindowFocus (mặc định: true)
// Fetch khi user focus lại window/tab
refetchOnWindowFocus: true,

// 3. refetchOnReconnect (mặc định: true)
// Fetch khi kết nối internet lại
refetchOnReconnect: true,

// 4. refetchInterval (mặc định: false)
// Fetch tự động cứ N ms
refetchInterval: 30000, // 30 giây
})

## refetchOnWindowFocus: true // Mặc định tất cả fetch khi focus

`ts So sánh các Refetch Strategies `
// Timeline:
// ─────────────────────────────────────────
// ↓ Component mount
// refetchOnMount: true → Fetch lần 1
//  
// ↓ User chuyển tab
// [rời khỏi window]
//  
// ↓ User quay lại tab (Window Focus)
// refetchOnWindowFocus: true → Fetch lần 2
//  
// ↓ Cứ 30 giây (nếu refetchInterval: 30000)
// refetchInterval: 30000 → Fetch lần 3, 4, 5...
//  
// ↓ Internet mất & kết nối lại
// refetchOnReconnect: true → Fetch lần N

## omit là gì

omit trong lodash dùng để tạo object mới bằng cách bỏ đi một hoặc nhiều key không cần thiết

\_.omit(object, ['key1', 'key2'])

EN: omit is lodash is used to create a new object by removing one or more unwanted keys from the original object

### Omit trong typescript là gì?

// Omit trong TypeScript Dùng để tạo type mới, bỏ field confirm_password.

### useMutation

useMutation is used to perform (để thực hiện) server-side actions that modify data, such as POST, PUT, PATCH or DELETE requests. Unlike useQuery, which is mainly used for fetching data, useMutation is triggered manually by calling mutate. It also provides useful states like loading, success, error and callbacks such as onSuccess and onError. After a mutation succeeds, we can invalidate related queries to refetch updated data.

```ts Cách hiểu ngắn gọn

useMutation giống như một công cụ giúp mình:

1. Gọi API thay đổi dữ liệu.
2. Biết khi nào API đang loading.
3. Biết khi nào thành công hoặc thất bại.
4. Xử lý sau khi API thành công, ví dụ refresh lại danh sách.
5. Giúp code gọn hơn thay vì tự viết nhiều useState.
```

### Phân biệt position absolute, relative trong CSS

relative = làm mốc cho con absolute
absolute = bay ra khỏi layout và bám theo cha relative

### Outlet là gì?

<Outlet/>

Outlet là nơi React Router render route con

```ts
{
  path: '',
  element: <ProtectedRoute />,
  children: [
    {
      path: 'profile',
      element: <Profile />
    }
  ]
}
```

Khi vào /profile, React Router chạy ProtectedRoute trước
Nếu hợp lệ, <Outlet/> sẽ render component con là <Profile />

### Trick giúp tăng tốc độ truy xuất bộ nhớ

Trick giúp tăng tốc độ truy xuất bộ nhớ là các kỹ thuật giúp lấy dữ liệu nhanh hơn và tránh xử lý lặp lại không cần thiết. Ví dụ dùng cache, dùng Map/Object để tìm kiếm theo key thay vì duyệt mảng, hoặc dùng useMemo trong React để tránh tính toán lại khi dữ liệu không thay đổi

### Hiểu về useContext

Dùng useContext cho authentication vì trạng thái đăng nhập cần được dùng ở nhiều nơi như route, header, profile và logout...Context giúp tránh truyền props qua nhiều tầng và quản lý auth tập trung hơn. Ưu điểm là đơn giản, dễ dùng cho app.

`Cách nhớ nhanh`
useContext = chia sẻ auth state toàn app
localStorage/cookie = lưu token sau khi reload
ProjectedRoute = chặn trang cần login
RejectedRoute = chặn user đã login vào login/register

# JSON.stringify vs JSON.parse

JSON.stringify — Khi bạn cần chuyển object/array thành string:

- Gửi dữ liệu lên server (API request body)
- Lưu dữ liệu vào LocalStorage/SessionStorage
- Ghi dữ liệu vào file
- Log dữ liệu để debug
- Truyền dữ liệu qua postMessage

```ts
const user = { name: "John", age: 30 };
const jsonString = JSON.stringify(user);
// Kết quả: '{"name":"John","age":30}'

// Gửi lên API
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify(user), // ← dùng stringify
});
```

JSON.parse - Khi bạn cần chuyển string thành object/array

- Nhận dữ liệu từ API response
- Đọc dữ liệu từ LocalStorage/SessionStorage
- Đọc dữ liệu từ file (string format)
- Nhận dữ liệu từ postMessage

```ts
const jsonString = '{"name":"John","age":30}';
const user = JSON.parse(jsonString);
// Kết quả: { name: 'John', age: 30 }

// Nhận từ API
const response = await fetch("/api/users");
const data = await response.json(); // .json() tự động parse
// hoặc: JSON.parse(await response.text()) ← dùng parse
```

Quy tắc nhớ:

- stringify: Object → String (khi cần gửi/lưu)
- parse: String -> Object (khi cần sử dụng)

# Object.fromEntries(searchParams) làm gì?

Nó chuyển từ URLSearchParams sang object thường

# omitBy trong lodash

omitBy thường là hàm của lodash, dùng để loại bỏ các field không cần thiết trong object query

Cú pháp:

omitBy(object, predicate)
Nghĩa là: Duyệt qua từng field trong object. Nếu field nào thỏa điều kiện predicate thì loại bỏ field đó.

```ts
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";

const query = {
  page: "1",
  limit: "30",
  name: undefined,
  sort_by: "price",
};

const result = omitBy(query, isUndefined);

console.log(result);
```

Kết quả:
{
page: '1',
limit: '30',
sort_by: 'price'
}

### Cách hiểu filter category

Tổng kết luồng hoạt động:
Giao diện AsideFilter: Thay đổi URL.
ProductList: Đọc URL tạo ra QueryConfig.
React Query: Thấy QueryConfig thay đổi -> Tự động gọi API.
API: Gửi tham số lên Server.
Server: Lọc dữ liệu và trả về cho client

### Omit và Pick đều dùng để tạo type mới từ type có sẵn

- Omit: lấy tất cả, bỏ vài field (khi nào dùng: type gốc có nhiều field, chỉ cần bỏ ít field)
- Pick: Chỉ lấy field được chọn (khi nào dùng: Chỉ muốn lấy một số field cụ thể)

### Giải thích code trong component InputNumber

1. Tại sao dùng Controller và {...field}?
   Vì InputNumber là một Custom Component (không phải thẻ <input /> thuần của HTML), React Hook Form không thể dùng hàm register bình thường để "chọc" vào bên trong lấy giá trị hay điều khiển DOM được.

Controller: Đóng vai trò là "người phiên dịch". nó lắng nghe state của form và truyền xuống cho component của bạn.
{...field}: Trong object field này có chứa: onChange, onBlur, value, name và đặc biệt là ref. Khi bạn viết {...field}, bạn đang truyền cái ref của React Hook Form vào InputNumber.

# Hiểu về useQuery và useMutation

useQuery = lấy dữ liệu
useMutation = thay đổi dữ liệu

useMutation có lợi vì:

- Chủ động gọi API khi user hành động
- Có sẵn loading/error/success
- Dễ xử lý onSuccess/onError
- Dễ cập nhật lại cache bằng invalidateQueries
- Code sạch hơn so với tự quản lý state

# queryClient.invalidateQueries

Dùng để báo cho React Query biết data trong cache đã cũ, cần fetch lại dữ liệu mới từ server
Ex: invalidateQueries = làm mới lại data của useQuery

# Hiểu cách thực thi thực tế với AppContext

1. AppProvider render (app.context.tsx)
   ↓
2. Tạo state: isAuthenticated, profile, reset function
   ↓
3. App render
   ↓
4. App useEffect chạy → addEventListener('clearLS', reset)

## Cách hiểu luồng chạy trong App.tsx

App render
→ useRouteElements tạo routes
→ useContext lấy reset từ AppContext
→ useEffect đăng ký effect
→ return JSX
→ UI hiển thị routeElements và ToastContainer
→ sau render, useEffect chạy
→ addEventListener clearLS với reset

Nói ngắn gọn:

useContext lấy reset trước.
Sau đó useEffect dùng reset để đăng ký listener.
Nhưng code bên trong useEffect chỉ chạy sau khi render xong.

# Cách debug

Cách nhớ ngắn gọn
Bị nhảy vào file .js lạ → bấm Shift + F11 để thoát ra
Không muốn nhảy vào hàm con → bấm F10
Muốn chạy tới breakpoint tiếp theo → bấm F5
Chỉ muốn vào hàm mình tự viết → bấm F11

```

```
