- Giao diện (Interface) `Student` định nghĩa cấu trúc dữ liệu cụ thể mà một đuối tượng sinh viên cần phải tuân thủ. Khi một đối tượng được tạo dựa trên giao diện (interface) này, nó phải chứa các thuộc tính đã được định nghĩa và có kiểu dữ liệu tương ứng.


## Còn chữ Pick có nghĩa là sao ?

- Trong TypeScript, `Pick` là một phép toán kiểu dữ liệu được sử dụng để tạo một kiểu mới bằng cách lựa chọn một số thuộc tính cụ thể từ một kiểu hiện có.

- Trong trường hợp của dòng mã của bạn:

```jsx
export type Students = Pick<Student, 'id' | 'email' | 'avatar' | 'last_name'>[]
```

- `Pick` được sử dụng để tạo kiểu `Students` từ kiểu `Student`.

- Cú pháp` Pick<T, K>` nhận hai tham số:

- `T`: Kiểu dữ liệu ban đầu từ đó chọn lựa thuộc tính. (Kiểu dữ liệu đã khai báo Interface từ trước đó)
- `K`: Union type của các thuộc tính muốn chọn.

- Kết quả trả về là một kiểu mới bao gồm các thuộc tính đã chọn từ `T`. Trong trường hợp này, kiểu `Students` sẽ chỉ chứa các thuộc tính `'id'`, `'email'`, `'avatar'` và `'last_name'` từ kiểu `Student`.