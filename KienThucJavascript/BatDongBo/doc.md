## Callback
- Định nghĩa: Hàm được truyền vào hàm khác như một đối số và sẽ được gọi lại sau khi một tác vụ hoàn thành
- Ưu điểm: Đơn giản, dễ dùng cho tác vụ nhỏ
- Nhược điểm: Gây ra callback hell (mã lồng nhiều tầng, khó đọc, khó bảo trì)

## Promise
- Định nghĩa: Là một đối tượng đại diện cho giá trị sẽ có trong tương lai (thành công hoặc thất bại)
- Trạng thái:
    + Pending (đang chờ)
    + fulfilled (thành công => .then())
    + rejected (thất bại -> .catch())
- Ưu điểm: Giúp tránh callback hell, dễ quản lý chuỗi bất đồng bộ

## Async / Await
- Định nghĩa: Cú pháp mới (ES2017) giúp viết code bất đồng bộ trông giống đồng bộ
    + async biến hàm thành bất đồng bộ và trả về Promise
    + await dùng để chờ một Promise hoàn thành trước khi tiếp tục.
- Ưu điểm: Code gọn gàng, dễ đọc, dễ debug

Note: 
- Nếu không dùng try/catch, gặp lỗi thì hàm async dừng tại chỗ
- Nếu dùng try/catch, bạn có thể kiểm soát luồng chạy, bỏ qua lỗi và tiếp tục chạy các lệnh sau


