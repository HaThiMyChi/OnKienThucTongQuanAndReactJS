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
