# 💡 Giải Thích Chi Tiết Code Upload Ảnh

## 🔑 Key Concepts

### 1. FormData - Gửi File

```typescript
// ❌ WRONG - Cannot send File object directly as JSON
const file = document.querySelector('input[type="file"]').files[0];
await api.updateProfile({ ...data, avatar: file }); // ❌ Fail

// ✅ CORRECT - Use FormData for multipart/form-data
const formData = new FormData();
formData.append("image", file);
const res = await api.uploadAvatar(formData);
```

**Tại sao?**

- File là binary data, không phải JSON
- FormData tạo multipart/form-data request (cho phép upload file)
- Server cần Content-Type: multipart/form-data
- Trong axios/http, khi detect FormData → auto set header

### 2. useRef - Kết Nối Input

```typescript
const fileInputRef = useRef<HTMLInputElement>(null)

// ❌ WRONG - Input không được kết nối
<input type="file" />
<button onClick={() => document.querySelector('input').click()}>
  Chọn ảnh
</button>

// ✅ CORRECT - Dùng useRef để reference
<input ref={fileInputRef} type="file" />
<button onClick={() => fileInputRef.current?.click()}>
  Chọn ảnh
</button>
```

**Lợi ích:**

- Tránh lỗi element not found
- Type-safe (TypeScript check)
- Không cần id hoặc querySelector

### 3. FileReader - Preview Ảnh

```typescript
// ❌ WRONG - Gửi file object trực tiếp
const file = e.target.files[0]
<img src={file} /> // ❌ Không hiện được

// ✅ CORRECT - Convert file thành Data URL
const reader = new FileReader()
reader.onloadend = () => {
  const dataUrl = reader.result as string
  setAvatarPreview(dataUrl)
  <img src={dataUrl} /> // ✅ Hiện được
}
reader.readAsDataURL(file)
```

**Cách hoạt động:**

- FileReader đọc file từ local storage
- Convert binary thành Base64 string
- Data URL format: `data:image/png;base64,iVBORw0KGgo...`
- Browser hiểu và render được

---

## 📊 Flow 1 vs Flow 2 - Code Differences

### State Management

**Flow 1:**

```typescript
// Chỉ cần fileInputRef
const fileInputRef = useRef<HTMLInputElement>(null);
// Ảnh lưu trực tiếp trong form state
// watch('avatar') → URL từ server
```

**Flow 2:**

```typescript
// Cần 2 state cho file & preview
const [avatarFile, setAvatarFile] = useState<File | null>(null);
const [avatarPreview, setAvatarPreview] = useState<string>("");
// Ảnh lưu trong state, upload sau
```

### Upload Timing

**Flow 1 - Upload Ngay:**

```typescript
const handleUploadAvatar = async (e) => {
  const file = e.target.files?.[0];
  // ... validate ...

  // 🔴 UPLOAD NGAY
  const formData = new FormData();
  formData.append("image", file);
  const res = await uploadAvatarMutation.mutateAsync(formData);

  // Set URL vào form
  setValue("avatar", res.data.data);
};
```

**Flow 2 - Upload Submit:**

```typescript
const handleSelectAvatar = async (e) => {
  const file = e.target.files?.[0];
  // ... validate ...

  // 🟢 KHÔNG UPLOAD, CHỈ LƯU
  setAvatarFile(file);
  setAvatarPreview(dataUrl);
};

const onSubmit = async (data) => {
  // 🔴 UPLOAD KHI SUBMIT
  if (avatarFile) {
    const formData = new FormData();
    formData.append("image", avatarFile);
    const res = await uploadAvatarMutation.mutateAsync(formData);
    finalAvatarUrl = res.data.data;
  }

  // Sau đó update profile
  await updateProfileMutation.mutateAsync({
    ...data,
    avatar: finalAvatarUrl,
  });
};
```

### Error Handling

**Flow 1:**

```typescript
try {
  const res = await uploadAvatarMutation.mutateAsync(formData);
  setValue("avatar", res.data.data);
  toast.success("Upload ảnh thành công");
} catch (error) {
  // Lỗi upload → show toast
  // User có thể retry ngay
  toast.error(error?.response?.data?.message);
}
```

**Flow 2:**

```typescript
const onSubmit = async (data) => {
  try {
    if (avatarFile) {
      try {
        const uploadRes = await uploadAvatarMutation.mutateAsync(formData)
        finalAvatarUrl = uploadRes.data.data
      } catch (uploadError) {
        // Lỗi upload → stop, không update profile
        toast.error('Upload ảnh thất bại')
        return // ⚠️ Quan trọng!
      }
    }

    // Chỉ đến đây nếu upload thành công (hoặc không có file)
    const res = await updateProfileMutation.mutateAsync({...})
    toast.success('Cập nhật thành công')
  } catch (error) {
    toast.error('Cập nhật thất bại')
  }
}
```

### Image Display

**Flow 1:**

```typescript
<img
  src={watch('avatar') || profile?.avatar || 'default-url'}
  alt='Avatar'
/>
// watch('avatar') → URL từ server (đã upload)
```

**Flow 2:**

```typescript
<img
  src={avatarPreview || watch('avatar') || profile?.avatar || 'default-url'}
  alt='Avatar'
/>
// avatarPreview → Local preview (chưa upload)
// watch('avatar') → URL từ server (nếu có)
```

---

## 🎯 API Integration

### userApi.uploadAvatar()

```typescript
uploadAvatar(body: FormData) {
  return http.post<SuccessResponse<string>>(
    'user/upload-avatar',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
```

**Giải thích:**

- Endpoint: `/user/upload-avatar`
- Method: POST
- Body: FormData (multipart)
- Response: `SuccessResponse<string>` → Server trả về URL string

**Cách dùng:**

```typescript
const formData = new FormData();
formData.append("image", file);

const res = await userApi.uploadAvatar(formData);
// res.data.data = "https://server.com/uploads/avatar-123.jpg"

setValue("avatar", res.data.data);
```

### userApi.updateProfile()

```typescript
updateProfile(body: BodyUpdateProfile) {
  return http.put<SuccessResponse<User>>('user', body)
}
```

**Giải thích:**

- Endpoint: `/user`
- Method: PUT
- Body: JSON (không phải FormData)
- Response: Updated User object

**Cách dùng:**

```typescript
const res = await userApi.updateProfile({
  name: "John",
  phone: "0123456789",
  address: "Address",
  avatar: "https://server.com/uploads/avatar-123.jpg",
  date_of_birth: "1990-01-01",
});
```

---

## 🔄 Mutations

### useMutation - Async Operations

```typescript
// ⭐ Upload mutation
const uploadAvatarMutation = useMutation({
  mutationFn: userApi.uploadAvatar,
});

// Usage: Flow 1
const res = await uploadAvatarMutation.mutateAsync(formData);

// Usage: Flow 2 (trong onSubmit)
if (avatarFile) {
  const uploadRes = await uploadAvatarMutation.mutateAsync(formData);
}

// States available:
uploadAvatarMutation.isPending; // true saat upload
uploadAvatarMutation.isError; // true jika upload gagal
uploadAvatarMutation.data; // Response data
uploadAvatarMutation.error; // Error object
```

**Apa itu mutation?**

- Used for side effects (POST, PUT, DELETE)
- Not for fetching (use useQuery for that)
- Tracks loading, error, success states
- mutateAsync() → promise-based (prefer over mutate())

---

## 📝 Input File Attributes

```typescript
<input
  ref={fileInputRef}              // React reference
  type='file'                     // File input
  accept='.jpg,.jpeg,.png'        // Only accept images
  onChange={handleUploadAvatar}   // Event handler
  className='hidden'              // Hide by default
/>
```

**Accept Pattern:**

```typescript
// Accept images
accept = "image/*"; // All image types
accept = ".jpg,.jpeg,.png"; // Only JPG & PNG
accept = "image/jpeg,image/png"; // MIME types

// Accept documents
accept = ".pdf,.docx,.xlsx";

// Accept multiple types
accept = ".jpg,.png,.pdf,video/*";
```

---

## 🎬 Event Flow - Flow 1 (Upload Ngay)

```
User Events:
│
├─ 1. Click "Chọn ảnh" button
│  └─> onClick={() => fileInputRef.current?.click()}
│      └─> Trigger hidden input.click()
│
├─ 2. File picker dialog opens
│  └─> User selects file
│
├─ 3. onChange event triggered
│  └─> handleUploadAvatar(e)
│      │
│      ├─ Get file: e.target.files[0]
│      ├─ Validate: type & size
│      │
│      ├─ Create FormData
│      │  └─ formData.append('image', file)
│      │
│      ├─ API call: uploadAvatarMutation.mutateAsync(formData)
│      │  └─ uploadAvatarMutation.isPending = true ✓
│      │  └─ API POST /user/upload-avatar
│      │
│      ├─ Response: URL string
│      │  └─ uploadAvatarMutation.isPending = false ✓
│      │
│      ├─ setValue('avatar', url)
│      │  └─ Form state updated
│      │  └─ Image re-render with new URL
│      │
│      └─ toast.success()
│
├─ 4. User fills other fields
│
└─ 5. Click "Lưu" button
   └─> onSubmit(data)
       │
       ├─ Form validation (yup schema)
       │  └─ Checks: name, phone, address, avatar, date_of_birth
       │
       ├─ API call: updateProfileMutation.mutateAsync(data)
       │  └─ PUT /user with avatar: URL (từ upload ở step 3)
       │
       ├─ Response: Updated User
       │
       ├─ setProfile(user)    // Context
       ├─ setProfileToLS(user) // localStorage
       ├─ refetch()            // Requery
       │
       └─ toast.success()
```

---

## 🎬 Event Flow - Flow 2 (Upload Submit)

```
User Events:
│
├─ 1. Click "Chọn ảnh" button
│  └─> onClick={() => fileInputRef.current?.click()}
│      └─> Trigger hidden input.click()
│
├─ 2. File picker dialog opens
│  └─> User selects file
│
├─ 3. onChange event triggered
│  └─> handleSelectAvatar(e)
│      │
│      ├─ Get file: e.target.files[0]
│      ├─ Validate: type & size
│      │
│      ├─ setAvatarFile(file)         // 💾 Store in state
│      │
│      ├─ FileReader: readAsDataURL(file)
│      │  └─ onloadend: setAvatarPreview(dataUrl)
│      │     └─ Image re-render with local preview
│      │
│      └─ toast.success('Đã chọn ảnh')
│
├─ 4. User fills other fields
│
└─ 5. Click "Lưu" button
   └─> onSubmit(data)
       │
       ├─ Form validation (yup schema)
       │
       ├─ Check: if (avatarFile) ?
       │  │
       │  └─ YES → Upload ảnh trước
       │     │
       │     ├─ Create FormData with file
       │     │
       │     ├─ API call: uploadAvatarMutation.mutateAsync(formData)
       │     │  └─ POST /user/upload-avatar
       │     │  └─ Returns URL
       │     │
       │     ├─ finalAvatarUrl = URL
       │     │
       │     └─ Catch error?
       │        └─ If YES → return early, abort
       │        └─ If NO → continue
       │
       ├─ API call: updateProfileMutation.mutateAsync()
       │  └─ PUT /user with avatar: finalAvatarUrl (từ upload)
       │
       ├─ Response: Updated User
       │
       ├─ setAvatarFile(null)           // Clear state
       ├─ setAvatarPreview('')          // Clear preview
       ├─ setProfile(user)              // Context
       ├─ setProfileToLS(user)          // localStorage
       ├─ refetch()                     // Requery
       │
       └─ toast.success()
```

---

## 🛡️ Validation

### File Validation (Client)

```typescript
// File type check
if (!file.type.includes("image")) {
  toast.error("Vui lòng chọn tệp ảnh");
  return;
}

// File size check (1MB = 1024 * 1024 bytes)
if (file.size > 1024 * 1024) {
  toast.error("Dụng lượng file tối đa 1 MB");
  return;
}

// Specific type check (stricter)
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
if (!ALLOWED_TYPES.includes(file.type)) {
  toast.error("Chỉ hỗ trợ JPEG và PNG");
  return;
}
```

### Form Validation (React Hook Form + Yup)

```typescript
// userSchema in utils/rules.ts
export const userSchema = yup.object({
  name: yup.string().max(160),
  phone: yup.string().max(20),
  address: yup.string().max(160),
  avatar: yup.string().max(1000), // ← Avatar URL validation
  date_of_birth: yup.date().max(new Date()),
  // ... other fields
})

// In component:
const { formState: { errors } } = useForm<FormData>({
  resolver: yupResolver(profileSchema)
})

// Show error:
<div>{errors.avatar?.message}</div>
```

---

## 🚀 Performance Optimization

### Flow 1 - Add Progress Bar

```typescript
const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const [uploadProgress, setUploadProgress] = useState(0)

  try {
    const formData = new FormData()
    formData.append('image', file)

    // ⭐ Track upload progress
    const config = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const { loaded, total } = progressEvent
        const percentComplete = (loaded / total) * 100
        setUploadProgress(percentComplete)
      }
    }

    const res = await http.post('/user/upload-avatar', formData, config)
    setValue('avatar', res.data.data)
  } catch (error) {
    toast.error('Upload fail')
  }
}

// UI:
{uploadAvatarMutation.isPending && (
  <div className='w-24 h-1 bg-gray-300 rounded-full'>
    <div
      className='h-full bg-orange rounded-full'
      style={{ width: `${uploadProgress}%` }}
    />
  </div>
)}
```

### Flow 2 - Debounce Multiple Selections

```typescript
const [isSelecting, setIsSelecting] = useState(false);

const handleSelectAvatar = async (e) => {
  // Prevent rapid successive selections
  if (isSelecting) return;
  setIsSelecting(true);

  const file = e.target.files?.[0];
  // ... logic ...

  setTimeout(() => setIsSelecting(false), 500);
};
```

---

## 🔐 Security Best Practices

### Server-Side Validation (Backend)

```
1. Re-validate file type & size
2. Scan file for malware
3. Rename file (prevent path traversal)
   - ❌ user_avatar.jpg (predictable)
   - ✅ user_123_2024_1234567890.jpg
4. Store outside web root
5. Serve with proper headers:
   - Content-Type: image/jpeg
   - Cache-Control: public, max-age=31536000
   - X-Content-Type-Options: nosniff
```

### Client-Side (React)

```typescript
// Always validate
if (!file.type.includes('image')) return

// Check MIME type
const ALLOWED = ['image/jpeg', 'image/png']
if (!ALLOWED.includes(file.type)) return

// Check size
const MAX_SIZE = 1024 * 1024 // 1MB
if (file.size > MAX_SIZE) return

// Sanitize display name
<div>{file.name.substring(0, 20)}...</div>
```

---

## 📚 Summary Cheat Sheet

| Concept           | Flow 1            | Flow 2                     |
| ----------------- | ----------------- | -------------------------- |
| **Upload Timing** | On file select    | On form submit             |
| **State**         | Only fileInputRef | avatarFile + avatarPreview |
| **Feedback**      | Immediate         | After submit               |
| **Retry**         | Easy              | Must resubmit form         |
| **Complexity**    | Low               | Medium                     |
| **UX**            | Better            | Acceptable                 |
| **Recommended**   | ✅ YES            | ❌ Only if required        |
