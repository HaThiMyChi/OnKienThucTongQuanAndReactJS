ES Module (ESM) là chuẩn chính thức từ ECMASCript 2015 (ES6) để tổ chức code Javascript thành các module (tệp riêng biệt), có thể import/export lẫn nhau.
- Mỗi file .js có thể coi như một module

# Đặc điểm của ES Module:
Mặc định ở chế độ strict mode (nghiêm ngặt).

Chỉ chạy trên server (http/https), không chạy trực tiếp qua file:// (như bạn gặp lỗi CORS khi nãy).

Chạy bất đồng bộ: Trình duyệt tải module song song, nhưng thực thi theo thứ tự import.

Mỗi module chỉ load 1 lần: Nếu import nhiều nơi, nó sẽ dùng chung (singleton).