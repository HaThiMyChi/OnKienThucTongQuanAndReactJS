# 🔄 Sơ Đồ Quy Trình Upload Ảnh Avatar

## Flow 1: Upload Ngay ✅ (Đã Implement)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLOW 1: Upload Ngay                          │
└─────────────────────────────────────────────────────────────────┘

User                              React Component               Server
 │                                      │                         │
 │  1. Click "Chọn ảnh"                │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                      onClick: trigger file input               │
 │                                      │                         │
 │  2. Select file                      │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                            onChange: handleUploadAvatar()      │
 │                                      │                         │
 │                            ✓ Validate file                     │
 │                            ✓ Create FormData                   │
 │                                      │                         │
 │                                      │ 3. POST /user/upload-avatar
 │                                      │────────────────────────>
 │                                      │                         │
 │                                      │ Kiểm tra file, lưu      │
 │                                      │ trên server              │
 │                                      │                         │
 │                                      │ Trả về URL ảnh
 │                                      │<────────────────────────
 │                                      │                         │
 │                            setValue('avatar', url)             │
 │                            toast.success()                     │
 │                                      │                         │
 │  ✅ Upload Success!                  │                         │
 │  🖼️  Ảnh hiển thị luôn               │                         │
 │                                      │                         │
 │  4. Fill other fields & Click "Lưu" │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                            onSubmit(data)                      │
 │                                      │ data.avatar = URL       │
 │                                      │                         │
 │                                      │ 5. PUT /user
 │                                      │────────────────────────>
 │                                      │                         │
 │                                      │ Update profile +avatar  │
 │                                      │                         │
 │                                      │ Trả về user updated
 │                                      │<────────────────────────
 │                                      │                         │
 │                            Save to context & localStorage      │
 │                            toast.success()                     │
 │                                      │                         │
 │  ✅ Profile Updated!                 │                         │
 │                                      │                         │

⏱️  Timeline:
   ├─ Upload: ~1-2s
   ├─ User fills form: ~5-10s
   └─ Submit: ~1-2s
   Total: ~7-14s


┌────────────────────────────────────────────────────────────────┐
│ Các Bước Chi Tiết:                                             │
├────────────────────────────────────────────────────────────────┤
│ 1️⃣ handleUploadAvatar()                                        │
│    ├─ Get file từ event                                        │
│    ├─ Validate: type & size                                    │
│    └─ Nếu ok → upload ngay                                     │
│                                                                │
│ 2️⃣ uploadAvatarMutation.mutateAsync(formData)                 │
│    ├─ API: POST /user/upload-avatar                           │
│    ├─ Server lưu file → Trả về URL                            │
│    └─ Set vào form: setValue('avatar', url)                   │
│                                                                │
│ 3️⃣ Người dùng thấy:                                            │
│    ├─ Ảnh update ngay trên UI                                  │
│    ├─ Toast "Upload ảnh thành công"                           │
│    └─ Button thay từ "Đang upload..." → "Chọn ảnh"            │
│                                                                │
│ 4️⃣ Người dùng điền các trường khác & nhấn "Lưu"              │
│    ├─ Validation form local                                    │
│    ├─ API: PUT /user với {name, phone, address, avatar: URL} │
│    └─ Server update toàn bộ profile                           │
│                                                                │
│ 5️⃣ Success:                                                    │
│    ├─ Toast "Cập nhật thành công"                             │
│    ├─ Refetch profile từ server                               │
│    └─ Save to localStorage                                     │
└────────────────────────────────────────────────────────────────┘
```

---

## Flow 2: Upload Khi Submit (Alternative)

```
┌─────────────────────────────────────────────────────────────────┐
│              FLOW 2: Upload Khi Submit (Deferred)               │
└─────────────────────────────────────────────────────────────────┘

User                              React Component               Server
 │                                      │                         │
 │  1. Click "Chọn ảnh"                │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                      onClick: trigger file input               │
 │                                      │                         │
 │  2. Select file                      │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                            onChange: handleSelectAvatar()      │
 │                                      │                         │
 │                            ✓ Validate file                     │
 │                            ✓ Set state: avatarFile             │
 │                            ✓ Preview: avatarPreview            │
 │                                      │                         │
 │  ⏳ Chưa upload, chỉ preview         │                         │
 │  🖼️  Ảnh hiển thị local (preview)    │                         │
 │                                      │                         │
 │  3. Fill other fields & Click "Lưu" │                         │
 ├──────────────────────────────────────>                         │
 │                                      │                         │
 │                            onSubmit(data)                      │
 │                                      │                         │
 │                    ⚡ Check if avatarFile exists               │
 │                                      │                         │
 │                            ✓ YES → Upload file!               │
 │                                      │                         │
 │                                      │ 4. POST /user/upload-avatar
 │                                      │────────────────────────>
 │                                      │                         │
 │                                      │ Lưu file → Trả URL      │
 │                                      │<────────────────────────
 │                                      │                         │
 │                            Get avatarUrl từ response           │
 │                                      │                         │
 │                                      │ 5. PUT /user
 │                                      │────────────────────────>
 │                                      │ (với avatar: URL)       │
 │                                      │                         │
 │                                      │ Update profile          │
 │                                      │<────────────────────────
 │                                      │                         │
 │                            Save to context & localStorage      │
 │                            Clear avatarFile state              │
 │                            toast.success()                     │
 │                                      │                         │
 │  ✅ Profile + Avatar Updated!       │                         │
 │                                      │                         │

⏱️  Timeline:
   ├─ File select: ~2-3s
   ├─ User fills form: ~5-10s
   ├─ Upload (on submit): ~1-2s
   ├─ Update profile: ~1-2s
   Total: ~8-17s


┌────────────────────────────────────────────────────────────────┐
│ Các Bước Chi Tiết:                                             │
├────────────────────────────────────────────────────────────────┤
│ 1️⃣ handleSelectAvatar()                                        │
│    ├─ Get file từ event                                        │
│    ├─ Validate: type & size                                    │
│    ├─ Set state: avatarFile (KHÔNG upload)                    │
│    └─ Preview: setAvatarPreview(dataUrl)                       │
│                                                                │
│ 2️⃣ Người dùng thấy:                                            │
│    ├─ Ảnh preview từ local file                                │
│    ├─ Không có API call                                        │
│    └─ Có thể thay file mà không upload                         │
│                                                                │
│ 3️⃣ Người dùng điền các trường & nhấn "Lưu"                   │
│    ├─ onSubmit() triggered                                     │
│    ├─ Check: avatarFile !== null?                              │
│    └─ YES → upload trước                                       │
│                                                                │
│ 4️⃣ uploadAvatarMutation (trong onSubmit)                       │
│    ├─ API: POST /user/upload-avatar                           │
│    ├─ Server lưu → Trả URL                                    │
│    └─ Tiếp tục → updateProfile                                │
│                                                                │
│ 5️⃣ updateProfileMutation                                       │
│    ├─ API: PUT /user                                           │
│    ├─ Data = {name, phone, address, avatar: URL}              │
│    └─ Server update toàn bộ                                    │
│                                                                │
│ 6️⃣ Success:                                                    │
│    ├─ Toast "Cập nhật thành công"                             │
│    ├─ Clear state: avatarFile = null                          │
│    └─ Save to context & localStorage                           │
└────────────────────────────────────────────────────────────────┘
```

---

## 📊 So Sánh Từng Khía Cạnh

### 1. **Số API Calls**

```
Flow 1: 2 calls (upload + update ngay lập tức)
Flow 2: 2 calls (upload + update trong onSubmit)
   → Ngang nhau!
```

### 2. **User Experience**

```
Flow 1: ✅✅✅✅✅ (5/5)
   - Feedback ngay lập tức
   - Ảnh update trước submit
   - Thoải mái nhất

Flow 2: ✅✅✅ (3/5)
   - Phải đợi submit mới upload
   - Nếu fail phải submit lại
   - Chờ lâu hơn
```

### 3. **Error Handling**

```
Flow 1:
   ✅ Upload fail → toast ngay → user có cơ hội chọn lại
   ✅ Form validation fail → ảnh vẫn lưu

Flow 2:
   ❌ Form validation fail → phải upload lại
   ⚠️ Upload fail khi submit → đáng khó chịu
```

### 4. **Performance**

```
Flow 1:
   - Upload: ~1-2s (ngay)
   - Submit: ~1-2s (chỉ gửi URL)
   - Total: ~2-4s

Flow 2:
   - Select: instant
   - Submit: ~2-4s (upload + update cùng lúc)
   - Total: ~2-4s

   → Tương tự nhưng Flow 1 có feedback sớm hơn
```

### 5. **Code Complexity**

```
Flow 1: ⭐⭐ (đơn giản)
Flow 2: ⭐⭐⭐⭐ (phức tạp hơn)
```

---

## 🎯 Khi Nào Dùng Cái Nào?

### **Dùng Flow 1 khi:**

- ✅ Muốn UX tốt nhất
- ✅ Người dùng có thể chọn lại ảnh nhiều lần
- ✅ Muốn feedback ngay lập tức
- ✅ Đây là trường hợp 99% ứng dụng

### **Dùng Flow 2 khi:**

- ✅ Ảnh là optional (không bắt buộc)
- ✅ Muốn confirm trước upload
- ✅ Ảnh chỉ upload cùng với data khác
- ✅ Còn tuỳ thuộc vào yêu cầu business

---

## 💡 Pro Tips

### Flow 1 - Upload Ngay:

```typescript
// 1. Có thể retry upload nếu fail
if (error) {
  toast.error("Upload fail. Click để retry");
  // Lưu reference để user retry
}

// 2. Progress bar
const handleUploadAvatar = (e) => {
  // Có thể add progress listener
  // formData.addEventListener('progress', (e) => {
  //   const progress = (e.loaded / e.total) * 100;
  //   setUploadProgress(progress);
  // })
};

// 3. Debounce / Throttle
// Tránh multiple uploads khi user chọn nhanh nhiều file
```

### Flow 2 - Upload Submit:

```typescript
// 1. Batch upload
// Nếu user chọn nhiều file, upload cùng lúc
const files = e.target.files; // multiple
const uploadPromises = Array.from(files).map((f) => uploadFile(f));
await Promise.all(uploadPromises);

// 2. Validate form trước upload
// Chỉ upload nếu form validation pass
const isValid = await form.trigger();
if (!isValid) return;
// Sau đó upload

// 3. Queue upload
// Nếu user submit nhiều lần, queue chúng
const uploadQueue = [];
if (isUploading) {
  uploadQueue.push({ file, data });
  return;
}
```

---

## 🔐 Security Considerations

### File Validation (Client-side):

```typescript
// Luôn validate trước upload
const MAX_SIZE = 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

if (file.size > MAX_SIZE) {
  toast.error("File too large");
  return;
}

if (!ALLOWED_TYPES.includes(file.type)) {
  toast.error("Invalid file type");
  return;
}
```

### Server-side (Backend):

```
1. Re-validate file size & type
2. Scan file cho malware
3. Rename file (tránh path traversal)
4. Store outside web root
5. Serve with proper headers
```

---

## 📋 Checklist Implement

- [x] Flow 1 đã implement trong Profile.tsx
- [ ] Thêm progress bar (optional)
- [ ] Thêm retry upload (optional)
- [ ] Test upload thành công
- [ ] Test upload fail
- [ ] Test file validation
- [ ] Test server-side validation
- [ ] Test edge cases (network error, timeout, etc.)
