```tsx
import { useRef } from 'react'

const Profile = () => {
  // 1️⃣ Tạo ref (initial value = null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 2️⃣ Kết nối ref với element qua attribute "ref"
  return (
    <input
      ref={fileInputRef} // ← Kết nối
      type='file'
    />
  )

  // 3️⃣ React tự động gán DOM element vào fileInputRef.current
  // After render: fileInputRef.current = <input type="file" />

  // 4️⃣ Bây giờ có thể truy cập
  const handleClick = () => {
    fileInputRef.current?.click() // ✅ Works!
  }
}
```

### Lifecycle của useRef

┌─────────────────────────────────────────────────┐
│ 1. Component khởi tạo │
│ const fileInputRef = useRef(null) │
│ fileInputRef.current = null │
└─────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────┐
│ 2. Render component │
│ <input ref={fileInputRef} type="file" /> │
│ (JSX code runs, creates virtual DOM) │
└─────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────┐
│ 3. React tạo DOM element │
│ const inputElement = document.createElement │
│ ('input') │
│ inputElement.type = 'file' │
└─────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────┐
│ 4. React gán ref │
│ fileInputRef.current = inputElement │
│ ✅ Bây giờ có thể truy cập! │
└─────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────┐
│ 5. Component render xong │
│ Có thể dùng: fileInputRef.current?.click() │
└─────────────────────────────────────────────────┘
