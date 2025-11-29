## Giải thích code trong file `blog.slice.ts`?

```jsx
import { current, PayloadAction, createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Post } from 'types/blog.type'
import http from 'utils/http'
```

- Đoạn code trên bao gồm các import và khai báo biến để sử dụng trong việc quản lý trạng thái của blog. Hãy giải thích từng dòng code một:

- Import:
- current: Một hàm từ Redux Toolkit để truy cập vào giá trị hiện tại của một trạng thái trong reducer
- PayloadAction: Một kiểu dữ liệu từ Redux Toolkit để đại diện cho một action có payload.
- createSlice: Một hàm từ Redux Toolkit để tạo ra một slice, bao gồm reducer và actions.
- createAsyncThunk: Một hàm từ Redux Toolkit để tạo ra một async thunk, cho phép xử lý các sie effect và gọi các actions khác.
- AsyncThunk: Một kiểu dữ liệu từ Redux toolkit đại diện cho một async thunk
- initialPOstList: Một hằng số dược import từ moduel `constants/blog`, chứ danh dách bài viết ban đầu
- POst một kiểu dữ liệu được import từ `types/blog.type`, đại diện cho cấu trúc dữ liệu của một bài viết
- http: Một module được import từ `utils/http`, đại diện cho công cụ gửi yêu cầu HTTP.

```jsx
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type PendingAction = ReturnType<GenericAsyncThunk['rejected']>
type PendingAction = ReturnType<GenericAsyncThunk['fulfilled']>
```

- GenericAsyncThunk là một alias kiểu dữ liệu được định nghĩa bằng cách sử dụng `AsyncThunk` từ Redux Toolkit. Nó đại diện cho một async thunk có kiểu trả về là `unknown`, `khong có tham số đầu vaof` và ` có bất kỳ loại extra metadata naof`.
- PendingAction là một alias kiểu dữ liệu đại diện cho action khi một async thunk đang trong trạng thái đang chờ (`pending`). Nó được xác định bằng cách sử dụng ReturnType để truy cập thuộc tính pending của GenericAsyncThunk
- RejectedAction là một alias kiểu dữ liệu đại diện cho action khi một async thunk bị từ chối `rejected`. Nó được xác định bằng cách sử dụng ReturnType để truy cập thuộc tính rejected của GenericAsyncThunk.
- FulfilledAction là một alias kiểu dữ liệu đại diện cho action khi một async thunk đã hoàn thành (fulfilled). Nó được xác định bằng cách sử dụng ReturnType để truy cập thuộc tính fulfilled của GenericAsyncThunk

- Các alias kiểu dữ liệu này giúp định nghĩa các kiểu dữ liệu cho các action tương ứng với trạng thái của async thunk (đang chờ, bị từ chối, hoàn thành). Điều này hỗ trợ trong việc xử lý các action trong reducers một các dễ dàng và tổ chức hơn.

```jsx
interface BlogState {
  postList: Post[]
  editingPost: Post |  null
  loading: boolean
  currentRequestId: undefined | null
}
```

= BlogState là một interface định nghĩa cấu trúc dữ liệu cho trạng thái của slice `blog`. Chi tiết của các thuộc tính trong `BlogState` là như sau:

- postList là một mảng các đối tương Post, dại diện cho danh sách các bài viết.
- editingPost là một đối tượng Post hoặc null, đại diện cho bài viết đang được chỉnh sửa. Nếu giá trị của editingPost là một đối tượng Post, đó là bài viết đang được chỉnh sửa. Nếu giá trị của editingPost là null, không có bài viết nào đang được chỉnh sửa. Thuộc tính editingPost được sử dụng để theo dõi trạng thái của bàn viết đang được chỉnh sửa trong ứng dụng. Khi người dùng bắt đầu chỉnh sửa bài viết, giá trị của `editingPost` sẽ được cập nhật thành đối tượng Post tương ứng.Khi quá trình chỉnh sửa hoàn thành hoặc bị hủy, giá trị của `editingPost` sẽ trở về null.
- loading là một giá trị boolean, đại diện cho trạng thái tải dữ liệu. Khi loading là true đang có quá trình tải dữ liệu diễn tra khi loading là false không có quá trình tải dữ liệu.
- currentRequestId là một chuối `string` hoặc undefined, đại diện cho id của request hiện tại đang được xử lý. Nếu không có request nào đang được xử lý, giá trị của currentRequestId sẽ là undefined.

- Interface `BlogState` này mô tả cấu trúc dữ liệu của trạng thái trong slice `blog` và được sử dụng để khởi tạo giá trị ban đầu cho trạng thái `initialState` và trong việc định nghĩa các reducers để thay đổi trạng thái của slice.

```jsx
const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}
```

- initialState định nghĩa trạng thái ban đầu của Redux store cho slice blog

- postList là một mảng chứa danh sách các bài viết. Giá trị ban đầu của postList được gắn bằng initialPostList là một mảng các bài viết được khởi tạo từ trước.
- editingPost là một đối tượng Post hoặc null. Giá trị ban đầu của editingPost được gán là null, cho biết không có bài viết nào đang được chỉnh sửa khi ban đầu.
- loading là một giá trị boolean, biểu thị trạng thái hiện tại của tiến trình tải dữ liệu. Giá trị ban đầu của loading được gán là false, cho biết không có quá trình tải dữ liệu nào đang diễn ra khi ban đầu.
- currentRequestId là một chuỗi string hoặc undefined, đại diện cho requestId hiện tại của tiến trình tải dữ liệu. Giá trị ban đầu của currentRequestId được gán là undefined, cho biết không có requestId nào đang tồn tại khi ban đầu.

=> initialState cung cấp các giá trị khởi tạo ban đầu cho các thuộc tính slice blog. Các giá trị này sẽ được cập nhật và thay đổi trong quá trình thực thi các reducers và thunks của slice.

```jsx
export const getPostList = creaAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})
```

- Đoạn code trên định nghĩa một createAsyncThunk có tên getPostList trong slice blog. createAsyncThunk là một hàm được cung cấp bởi Redux Toolkit để tạo ra các thunks cho các tác vụ không đồng bộ (asynchronous).

- getPostList là một async thunk, nghĩa là nó sẽ thực hiện các tác vụ không đồng bộ bà tự động xử lý các trạng thái liên quan đến tác vụ đó, bao gồm trạng thái "pending" (đang chờ), fullfilled (hoàn thành) và rejected (bị từ chối).

- Cụ thể khi getPostList được gọi, nó sẽ thực hiện yêu cầu HTTP GET đến đường dẫn `/posts` bằng cách sử dụng thư viện http và truyền thunkAPI.signal để có thể hủy yêu cầu (nếu cần). Kết quả trả về từ yêu cầu HTTP sẽ được trả về dưới dạng respnse.data.

- Điều này cho phép bạn dễ dàng thực hiện các tác vụ không đồng bộ trong Redux và theo dõi trạng thái của chúng thông qua reducers và các action tương ứng.
