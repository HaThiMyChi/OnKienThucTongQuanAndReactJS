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

# Cách debug

Cách nhớ ngắn gọn
Bị nhảy vào file .js lạ → bấm Shift + F11 để thoát ra
Không muốn nhảy vào hàm con → bấm F10
Muốn chạy tới breakpoint tiếp theo → bấm F5
Chỉ muốn vào hàm mình tự viết → bấm F11
