Tóm lại

useQuery: dùng để đọc data + render UI theo trạng thái fetch.

useQueryClient: dùng để can thiệp/điều khiển cache (invalidate, prefetch, set data, cancel…).

Trong code của bạn:

useQuery => lấy danh sách students

useQueryClient => invalidateQueries sau khi delete, cancelQueries, prefetchQuery khi hover.

Khác gì 400?

400 Bad Request: request “tệ” / sai cấu trúc, server không hiểu.

422: server hiểu request, nhưng business validation fail (dữ liệu không đạt yêu cầu).

- `useMatch` và `useParams` là các hook được cung cấp bởi thư viện `react-router-dom` để truy cập thông tin về URL và các tham số truyền vào trong React Router.

- `useMutation`, `useQuery`, và `useQueryClient` là các hook được cung cấp bởi thư viện `@tanstack/react-query` để quản lý trạng thái của các hoạt dộng như truy vấn dữ liệu, cập nhật dữ liệu hoặc xóa dữ liệu.

- `useEffect` là một hook được cung cấp bởi React để thực hiện các side effect sau khi component được render.

- `useMemo` là một hook được sử dụng để tối ưu hóa việc tính toán các giá trị phức tạp và tránh việc tính toán lại trong mỗi lần render

- `useState` là một hook được sử dụng để quản lý trạng thái (state) của component.

- `toast` là một function được cung cấp bởi thư viện `react-toastify` để hiển thị thông báo (toast) trên giao diện người dùng.

- ✅ Tóm lại: Trong đoạn code đó, chúng ta sử dụng các hook và function từ các thư viện như `react-router-dom`, `@tanstack/react-query`, `react-toastify` để quản lý trạng thái và thực hiện các hoạt động liên quan đến truy vấn dữ liệu và cập nhật dữ liệu. Chúng ta import các function từ module `apis/students.api` để thực hiện các yêu cầu HTTP liên quan đến sinh viên. Các hook `useParams` và `useMatch` được sử dụng để truy cập thông tin từ URL. Chúng ta cũng sử dụng hook `useEffect`, `useMemo` và `useState` để quản lý trạng thái và thực hiện các side effect trong React component.

```jsx
type FormStateType = Omit<Student, 'id'> | Student
```

- `FormStateType` là một kiểu dữ liệu mới được định nghĩa.

- Kiểu dữ liệu này có thể đại diện cho hai kiểu khác nhau:` Omit<Student, 'id'>` và `Student`.

- `Omit<Student, 'id'>` là một kiểu dữ liệu mới được tạo ra từ kiểu `Student` bằng cách loại bỏ thuộc tính `'id'` khỏi nó. Điều này đại diện cho thông tin của một sinh viên mới (không có `'id'`).

- `Student` là kiểu dữ liệu chứa thông tin của một sinh viên đã tồn tại (bao gồm cả `'id'` và các thuộc tính khác).

- ✅ Với việc sử dụng `|` (union) có thể chứa thông tin của hai trường hợp trên, ta tạo ra một kiểu hợp nhất cho `FormStateType`. Điều này cho phép `FormStateType` có thể chứa cả thông tin của một sinh viên mới (không có `'id'`) và thông tin của một sinh viên đã tồn tại, tùy thuộc vào ngữ cảnh sử dụng trong mã nguồn.

👉 Đoạn 4:

```jsx
type FormError =
  | {
      [key in keyof FormStateType]: string
    }
  | null
```

- Đoạn code trên định nghĩa kiểu `FormError`, một union type gồm hai phần tử:

- Đầu tiên là một object có các thuộc tính tương ứng với các thuộc tính của `FormStateType`. Mỗi thuộc tính trong `FormError` đại diện cho một trường thông tin của form và có giá trị là một chuỗi (`string`) đại diện cho lỗi của trường đó. Điều này cho phép chúng ta lưu trữ thông tin lỗi tương ứng với từng trường trong form.

- Thứ hai là hai giá trị `null`. Đây là trường hợp không có lỗi xảy ra trong form.

- ✅ Dùng union type `|` cho phép `FormError` có thể là một `object` chứa thông tin lỗi hoặc có giá trị `null`, tùy thuộc vào ngữ cảnh sử dụng.

## Trong trường hợp này, tại sao không sử dụng `interface` mà phải sử dụng `type` ?

- Trong TypeScript, cả `interface` và `type` đều có thể được sử dụng để định nghĩa kiểu dữ liệu tùy chỉnh. Tuy nhiên, có một số khác biệt giữa hai loại này:

1. `Interface`: Interface cho phép khai báo một cấu trúc dữ liệu và kiểu dữ liệu cho đối tượng . Nó thường được sử dụng để định nghĩa các hợp đồng (contracts) và cung cấp sự hỗ trợ cho tính kế thừa và mở rộng.

2. `Type`: Type cho phép định nghĩa một kiểu dữ liệu tùy chỉnh, bao gồm các kiểu hợp nhau (union type), kiểu giao diện (intersection type) và các kiểu khác như kiểu tuple, kiểu function, kiểu literval... `Type` thường được sử dụng để tạo ra các kiểu dữ liệu phức tạp và thực hiện các phép toán trên các kiểu.

- ✅ Trong trường hợp của đoạn code trên, sử dụng `type` thay vì `interface` cho kiểu `FormError` không có sự khác biệt quan trọng. Cả hai đều có thể được sử dụng để định nghĩa kiểu dữ liệu tương tự. Lựa chọn giữa `interface` và `type` thường là một vấn đề cá nhân hoặc tuỳ thuộc vào quy ước của dự án.

## Sự khác biệt giữa việc sử dụng `interface` và `type` là gì ?

- Sự khác biệt chính giữa việc sử dụng `interface` và `type` trong TypeScript như sau:

1. `Interface`:

- `Interface` trong TypeScript được sử dụng để định nghĩa cấu trúc dữ liệu, nó có thể chứa các phương thức, thuộc tính, kế thừa từ các interface khác, và có thể được triển khai (implement) bởi các đối tượng.
- `Interface` thường được sử dụng trong việc mô hình hóa cấu trúc dữ liệu và định nghĩa hợp đồng (contract) giữa các thành phần trong code.

2. `Type`:

- `Type` trong TypeScript cũng được sử dụng để định nghĩa cấu trúc dữ liệu, nhưng nó linh hoạt hơn `Interface` và có thể định nghĩa các kiểu dữ liệu tùy chỉnh (custom types) bằng cách kết hợp các kiểu hiện có.
- `Type` thường được sử dụng trong việc định nghĩa kiểu dữ liệu phức tạp, `unions`, `intersections`, và các trường hợp khác mà `Interface` không thể thực hiện được.

- ✅ Tuy nhiên, sự khác biệt giữa `interface` và `type` không lớn và thường được sử dụng tùy theo sở thích và yêu cầu của từng dự án. Trên thực tế, `interface` và `type` có thể được sử dụng chung và có thể thay thế lẫn nhau trong nhiều tình huống.

## Hãy giải thích rõ hơn về các ý trong đoạn trước ?

- Ví dụ, trong đoạn mã `FormError`, chúng ta khai báo một đối tượng với các thuộc tính là các `key` của `FormStateType` và kiểu dữ liệu là `string`. Điều này cho phép chúng ta gán các giá trị kiểu `string` cho các thuộc tính tương ứng trong đối tượng `FormError`.

## hãy cho các ví dụ về kiểu `tuple`, kiểu `function`, kiểu `literal`, kiểu `unions` và kiểu `intersections`, trong typescript ?

1. Kiểu Tuple:

```jsx
// Khai báo một tuple để biểu diễn một địa chỉ
type Address = [string, string, string]

// Sử dụng kiểu Address
const myAddress: Address = ['Street 1', 'City', 'Country']

console.log(myAddress[0]) // 'Street 1'
console.log(myAddress[1]) // 'City'
console.log(myAddress[2]) // 'Country'
```

2. Kiểu Function:

```jsx
// Khai báo kiểu dữ liệu cho một hàm tính tổng
type AddFunction = (a: number, b: number) => number

// Định nghĩa hàm tính tổng
const add: AddFunction = (a, b) => a + b

// Sử dụng hàm tính tổng
console.log(add(2, 3)) // 5
```

3. Kiểu Literal:

```jsx
// Khai báo kiểu dữ liệu literal
type Status = 'active' | 'inactive' | 'pending'

// Sử dụng kiểu Status
const userStatus: Status = 'active'
console.log(userStatus) // 'active'

// Gán giá trị không hợp lệ
const userStatus: Status = 'disabled' // Lỗi: Type '"disabled"' is not assignable to type 'Status'
```

- ✅ Trong ví dụ trên, chúng ta sử dụng kiểu dữ liệu `tuple` để biểu diễn một địa chỉ, kiểu dữ liệu `function` để định nghĩa một hàm tính tổng, và kiểu dữ liệu `literal` để giới hạn các giá trị có thể được gán cho một biến.

4. Kiểu Unions:

```jsx
// Khai báo kiểu dữ liệu unions cho các loại hình học
type Shape = Square | Circle | Triangle

interface Square {
  kind: 'square';
  size: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

// Sử dụng kiểu Shape
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'square':
      return shape.size * shape.size
    case 'circle':
      return Math.PI * shape.radius * shape.radius
    case 'triangle':
      return (shape.base * shape.height) / 2
    default:
      throw new Error('Invalid shape')
  }
}

const square: Square = {
  kind: 'square',
  size: 5
}
console.log(getArea(square)) // 25

const circle: Circle = {
  kind: 'circle',
  radius: 3
}
console.log(getArea(circle)) // 28.274333882308138

const triangle: Triangle = {
  kind: 'triangle',
  base: 4,
  height: 6
}
console.log(getArea(triangle)) // 12
```

- Trong ví dụ trên, chúng ta sử dụng kiểu `unions` để biểu diễn các loại hình học (hình vuông, hình tròn, hình tam giác) thông qua các interface `Square`, `Circle` và `Triangle`. Chúng ta sử dụng kiểu unions `Shape` trong hàm `getArea()` để tính diện tích của các hình học khác nhau.

5. Kiểu Intersections:

```jsx
// Khai báo kiểu dữ liệu intersections (Giao nhau => Lấy tất cả) cho thông tin người dùng
type User = {
  id: number,
  name: string
}

type DetailedUser = {
  address: string,
  age: number
}

// Sử dụng kiểu intersections (Giao nhau => Lấy tất cả)
const user: User & DetailedUser = {
  id: 1,
  name: 'John Doe',
  address: 'Street 1',
  age: 30
}

console.log(user.id) // 1
console.log(user.name) // 'John Doe'
console.log(user.address) // 'Street 1'
console.log(user.age) // 30
```

- Trong ví dụ trên, chúng ta sử dụng kiểu `intersections` để kết hợp các thuộc tính từ hai kiểu dữ liệu `User` và `DetailedUser`. Kết quả là ta có một kiểu dữ liệu mới `User & DetailedUser` có chứa tất cả các thuộc tính của cả hai kiểu dữ liệu.

---

Đoạn mã trên định nghĩa một form để thêm hoặc sửa thông tin của một sinh viên. Dưới đây là giải thích từng phần của mã:

1. `<h1 className='text-lg'>{isAddMode ? 'Add' : 'Edit'} Student</h1>`: Hiển thị tiêu đề của form, nếu `isAddMode` là `true` thì hiển thị `"Add Student"`, ngược lại hiển thị `"Edit Student"`.

2. `<form className='mt-6' onSubmit={handleSubmit}>`: Định nghĩa một form và gắn sự kiện onSubmit để xử lý khi người dùng submit form.

3. `input elements`: Đây là các trường nhập liệu trong form. Mỗi trường nhập liệu được đóng gói trong một `div` có class `group relative z-0 mb-6 w-full`. Các thuộc tính của từng trường nhập liệu bao gồm:

- `type`: Loại dữ liệu nhập liệu (text, radio, tel).
  - (`"tel"` là một trong các loại dữ liệu được hỗ trợ trong HTML và được sử dụng để đại diện cho số điện thoại.)
- `name`: Tên của trường nhập liệu.
- `id`: ID của trường nhập liệu.
- `value`: Giá trị hiện tại của trường nhập liệu.
- `onChange`: Sự kiện xảy ra khi giá trị của trường nhập liệu thay đổi.
- `className`: Các lớp CSS được áp dụng cho trường nhập liệu.

4. `label` elements: Đây là nhãn cho từng trường nhập liệu. Các thuộc tính của nhãn bao gồm:

- `htmlFor`: ID của trường nhập liệu tương ứng.
- `className`: Các lớp CSS được áp dụng cho nhãn.

5. `{errorForm && (...)}`: Nếu biến `errorForm` có giá trị (khác `null` hoặc `undefined`), thì sẽ hiển thị thông báo lỗi trong một phần tử `p`.

6. `<button type='submit' className='...'>`: Đây là nút submit trong form. Các thuộc tính của nút bao gồm:

- `type`: Loại nút (submit).
- `className`: Các lớp CSS được áp dụng cho nút.

- ✅ Đoạn mã trên định nghĩa giao diện của form và các sự kiện xảy ra khi người dùng thao tác trên form.

---
