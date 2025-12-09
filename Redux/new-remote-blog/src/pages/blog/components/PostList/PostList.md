## `promise.abort()` cũng có thể được gọi là `cleanup function` đúng không?

- Đúng rồi, trong trường hợp này, `promise.abort()` được gọi khi `component` bị xóa khỏi DOM (`unmount`).

- `Cleanup function` được sử dụng để xử lý các tác vụ phụ như dọn dẹp các (`resources`, `huy các kết nối `, unsubscribe các events listener,...) khi component bị unmount.

- Trong đoạn code này, promise.abort() được sử dụng để cancel request khi component bị unmount. Nó được đặt trong return function của `useEffect` để đảm bảo rằng nó sẽ được thực thi trước khi `component` bị unmount. Do đó, nó có thể được gọi là một `cleanup function`

- Trong React, cleanup function có thể được thực thi thông qua hàm useEffect với tham số thứ 2 là một mảng (`array`) chứa các `dependencies` của effect. Nếu effect này trả về một hàm (`cleanup function`), thì hàm này sẽ được thực thi khi component bị unmount hoặc tham số deps của effect thay đổi.

## Cho ví dụ về `promise.abort()`?

- Để cho rõ hơn về việc sử dụng `promise.abort()`, ta có thể xem xét ví dụ sau:

- Giả sử chúng ta đang gọi một API để lấy danh sách sản phẩm từ server. Tuy nhiên, trang web của chúng ta cần cập nhật nhanh chóng và không được chậm chạp. Vì vậy, nêu mất quá nhiều thời gian để lấy dữ liệu từ server (ví dụ: do kết nôi mạng chậm hoặc lỗi server), chúng ta muốn người dùng có thể hủy bỏ yêu cầu lấy dữ liệu.

- Chúng ta có thể sử dụng `AbortController` để tạo một signal và sử dụng signal đó để hủy yêu cầu AJAX đang chờ. Ví dụ dưới đây minh họa cách sử dụng `AbortController` và signal để hủy yêu cầu AJAX.

```jsx
const controller = new AbortController()
const { signal } = controller

fetch('/api/products', { signal })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Request aborted')
    } else {
      console.error('Request failed', error)
    }
  })

// Để hủy yêu cầu AJAX đang chờ, ta có thể gọi controller.abort()
controller.abort()
```

- Đoạn code này minh họa cách sử dụng `AbortController` trong `Javascript` để hủy một yêu cầu AJAX khi nó đang chờ phản hồi từ server.
  - Đầu tiên, tạo một instance của AbortController và lấy signal từ đối tượng controller. Sau đó, truyền signal vào fetch request thông qua thuộc tính signal. Nếu yêu cầu AJAX được gọi với signal, khi chúng ta gọi controller.abort(), thì yêu cầu AJAX đang chờ sẽ bị hủy và trả về một AbortError.

  - Trong đoạn code này, khi fetch được gọi với signal, ta kiểm tra lỗi xảy ra có phải là AbortError không. Nếu có, chúng ta biết rằng yêu cầu AJAX đã bị hủy và có thể xử lý theo cách tùy ý. Nếu không, chúng ta xử lý lỗi như thông thường.

  - Chú ý rằng, AbortController là một tính năng mới trong JavaScript, được giới thiệu trong ES2017, do đó, nó có thể không được hỗ trợ trên tất cả các trình duyệt.

## Có nghĩa là ví dụ ta có 2 button: 1 button lấy dữ liệu và 1 button hủy khi đang lấy dữ liệu. Có tình huống như thế này: `Khi tôi bấm vào nút lấy dữ liệu mà trong lúc đó mạng của tôi lag quá. Thì trong lúc đó tôi bấm vào nút hủy dữ liệu thì code của tôi nó sẽ chạy vào dòng controller.abort()` đúng không?

- `Đúng rồi`, khi bạn bấm vào nút hủy thì sẽ chạy đến dòng code controller.abort(). Việc này sẽ gửi tín hiệu `hủy` đến yêu cầu AJAX đang chờ, và nó sẽ bị hủy và không trả về kết quả. Sau đó, hàm fetch() sẽ bị reject với lỗi AbortError.

- Trong trường hợp này, bạn có thể sử dụng `try...catch` để bắt lỗi và xử lý tình huống này một cách chính xác.
