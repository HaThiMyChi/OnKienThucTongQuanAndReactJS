# React Query

## Giới thiệu series React Query

Series này sẽ khoản 10 video, xem hết series này bạn sẽ nắm vững được React Query và có thể tự tin xử lý mọi case thực tế

- Video 1: React query là gì? setup dev tool, gọi query

## React Query là gì?

TanStack Query (tên mới) hay React Query là thư viện giúp quản lý các state bất đồng bộ như data từ api.

Sức mạnh của Tanstack Query

- Quản lý cache data và cập nhật cực kỳ đơn giản với zero config
- Không dùng global state, reducer để quản lý, không học thuật khó hiểu. Quên Redux được rồi đó!
- Có khả năng tương thích và mở rộng với mọi use-case

Từ khi biết đến Tanstack Query, mình đã tiết kiệm được thời gian code và sản phẩm cũng đem lại trải nghiệm người dùng tốt hơn.

Trả lời câu hỏi phổ biến:

Tanstack Query dùng gì để gọi API?

Tanstack Query không đảm nhận việc gọi API, việc gọi API sẽ thực hiện thông qua các thư viện bạn dùng như axios, fetch API. Còn Tanstack Query chỉ đảm nhận việc quản lý data và trigger khi cần thiết.

## Lưu ý trước khi học

React Query có cơ chế caching hơi khác một chút so với RTK Query, nên anh em đừng lấy logic của RTK Query rồi suy ngược lại React Query cũng giống vậy nhé.

> Anh em hãy dành ra 1 phút để quên đi cách caching của RTK Query 😁

## Một số khái niệm quan trọng

- `staleTime` (default `0` ms): Thời gian data được cho là đã cũ. Khi get data xong thì sau một thời gian bạn quy định thì data nó sẽ tự cũ. **Lưu ý cái `stale` trên dev tool nó hiển thị là data của bạn `stale` và `active`**
- `cacheTime` (default `5*60*1000` ms tức 5 phút): Thời gian data sẽ bị xóa ra khỏi bộ nhớ đệm. Có thể data đã "cũ" nhưng nó chưa bị xóa ra khỏi bộ nhớ đệm vì bạn set `staleTime < cacheTime`. Thường thì người ta sẽ set `staleTime < cacheTime`
- `inactive`: là khi data đó không còn component nào subcribe cả

```tsx
const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
```

`result` là một object chứa một vài state rất quan trọng: `status`, `fetchStatus`,...

Những state về các khoảnh khắc của data

- `isLoading` or `status === 'loading'` - Query chưa có data
- `isError` or `status === 'error'` - Query xảy ra lỗi
- `isSuccess` or `status === 'success'` - Query thành công và data đã có sẵn

Những state về data

- `error` - Nếu `isError === true` thì `error` sẽ xuất hiện ở đây
- `data` - Nếu `isSuccess === true` thì `data` sẽ xuất hiện ở đây

Đặc biệt là `fetchStatus`

- `isFetching` or `fetchStatus === 'fetching'` - Đang fetching API.
- `isPaused` or `fetchStatus === 'paused'` - Query muốn fetch API nhưng bị tạm dừng vì một lý do nào đó.
- `fetchStatus === 'idle'` - Query không làm gì cả

### Nếu thấy quá rối vì quá nhiều trạng thái, sự khác nhau giữa `status` và `fetchStatus` là như thế nào?

Chỉ cần nhớ

- `status` cho thông tin `data` có hay không
- `fetchStatus` cho thông tin về `queryFn` có đang chạy hay không

## Cơ chế caching

Một data mà đã `stale` thì khi gọi lại query của data đó, nó sẽ fetch lại api. Nếu không `stale` thì không fetch lại api (đối với trường hợp `staleTime` giữa các lần giống nhau)

> Còn đối với trường hợp `staleTime` giữa 2 lần khác nhau thì nếu data của lần query thứ 1 xuất hiện lâu hơn thời gian `staleTime` của lần query thứ 2 thì nó sẽ bị gọi lại ở lần thứ 2, dù cho có stale hay chưa.
> Ví dụ: `useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: 10*1000 })` xuất hiện 5s trước, bây giờ chúng ta gọi lại `useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: 2*1000 })` thì rõ ràng cái data của lần 1 dù nó chưa được cho là stale nhưng nó xuất hiện 5s trước và lâu hơn thời gian staleTime là 2s nên nó sẽ bị gọi lại ở lần 2.

Một data mà bị xóa khỏi bộ nhớ (tức là quá thời gian `cacheTime`) thì khi gọi lại query của data đó, nó sẽ fetch lại api. Nếu còn chưa bị xóa khỏi bộ nhớ nhưng đã `stale` thì nó sẽ trả về data cached và fetch api ngầm, sau khi fetch xong nó sẽ update lại data cached và trả về data mới cho bạn.

Caching là một vòng đời của:

- Query Instance có hoặc không cache data
- Fetch ngầm (background fetching)
- Các inactive query
- Xóa cache khỏi bộ nhớ (Garbage Collection)

Một ví dụ như thế này cho anh em dễ hiều:

Giả sử chúng ta dùng `cacheTime` mặc định là **5 phút** và `staleTime` là `0`.

```jsx
function A() {
  const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}
function B() {
  const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}
function C() {
  const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}
```

- `A` component được mount
  - Vì không có query nào với `['todos']` trước đó, nó sẽ fetch data
  - Khi fetch xong, data sẽ được cache dưới key là `['todos']`
  - hook đánh dấu data là `stale` (cũ) vì sau `0`s
- Bây giờ thì `B` component được mount ở một nơi nào đó
  - Vì cache data `['todos']` đã có trước đó, data từ cache sẽ trả về ngay lập tức cho component `B`
  - Vì cache data `['todos']` được cho là đã `stale` nên nó sẽ fetch api tại component `B`
    - Không quan trọng function `fetchTodos` ở `A` và `B` có giống nhau hay không, việc fetch api tại `B` sẽ cập nhật tất cả các state query liên quan của `B` và `A` vì 2 component cùng key => cùng subcribe đến một data
  - Khi fetch thành công, cache data `['todos']` sẽ được cập nhật, cả 2 comonent `A` và `B` cũng được cập nhật data mới
- Bây giờ thì `A` và `B` unmount, không còn sử dụng nữa, không còn subcribe đến cache data `['todos']` nữa nên data `['todos']` bị cho là `inactive`
  - Vì `inactive` nên `cacheTime` sẽ bắt đầu đếm ngược 5 phút
- Trước khi `cacheTime` hết thì ông `C` comopnent được mount. cache data `['todos']` được trả về ngay lập tức cho `C` và `fetchTodos` sẽ chạy ngầm. Khi nó hoàn thành thì sẽ cập nhật lại cache với data mới.
- Cuối cùng thì `C` unmount
- Không còn ai subcribe đến cache data `['todos']` trong 5 phút tiếp theo nữa và cache data `['todos']` bị xóa hoàn toàn

## Mutations chỉ có create, update, delete chứ get là không nằm trong mutations đúng không?

- Đúng, trong mutations thường được sử dụng để thực hiện các thao tác tạo mới (create), cập nhật (update) và xóa (delete) dữ liệu. Thông thường các thao tác lấy dữ liệu (get) sẽ được thực hiện thông qua các truy vấn (queries) chứ không thuộc phạm vi mutations.

## Một số khái niệm quan trọng React Query:

1. `Query`: Một query trong react Query đại diện cho một yêu cầu để lấy dữ liệu từ nguồn dữ liệu bên ngoài như API. Query bao gồm thông tin như `query key`, `query function`, và các tùy chọn khác để cấu hình việc lấy dữ liệu.

2. `Mutation`: Một mutation trong react query đại diện cho một yêu cầu để thay đổi dữ liệu trên nguồn dữ liệu bên ngoài như thêm, sửa, xóa dữ liệu. Mutation bao gồm thông tin như mutation function và các tùy chọn khác để cấu hình việc thực hiện mutation.

3. `Query key`: Query key là một giá trị duy nhất đại diện cho một query. Nó được sử dụng để xác định một query cụ thể trong React Query. Query key thường được định nghĩa bằng một mảng các giá trị, trong đó có thể bao gồm các tham số để tạo ra một key duy nhất cho mỗi query.

4. `Query function`: Query function là một hàm được gọi khi thực hiện một query. Hàm này thực hiện việc gọi API hoặc tương tác với nguồn dữ liệu bên ngoài để lấy thông tin. Query function trả về một Promise chứa dữ liệu được lấy từ nguồn dữ liệu.

5. Cache: Cache trong react query là nơi lưu trữ dữ liệu đã được lấy từ các query trước đó. Khi có một query mới với cùng `query key`, React query sẽ kiểm tra cache trước khi gọi `query function`. Nếu dữ liệu đã tồn tại trong cache và vẫn còn hợp lệ, React Query sẽ trả về dữ liệu từ cache mà không cần thực hiện query function.

6. Invalidate cache: Invalidate cache là việc xóa dữ liệu trong cache của một query cụ thể. Khi dữ liệu trên nguồn dữ liệu bên ngoài thay đổi, việc invalidate cache sẽ đảm bảo rằng dữ liệu mới nhất được lấy trong các lần query tiếp theo.

7. Prefetching: Prefetching là việc tải trước dữ liệu từ nguồn dữ liệu bên ngoài trước khi nó được yêu cầu. Điều này giúp cải thiện trải nghiệm người dùng bằng cách đảm bảo rằng dữ liệu đã được tải trước và sẵn sàng khi cần thiết.

8. Optimistic Updates. Optimistic updates là kỹ thuật cho phép cập nhât giao diện người dùng ngay lập tức sau khi thực hiện một mutation, trước khi nhận được phản hồi từ nguồn dữ liệu bên ngoài. Điều này tạo ra một trải nghiệm tương tác mượt mà và giúp giảm thời gian chờ đợi cho người dùng.

## Cơ chế caching React Query:

- Cơ chế caching trong React Query là một trong những tính năng quan trọng của thư viện, giúp tối ưu hóa việc lấy dữ liệu từ nguồn dữ liệu bên ngoài và cải thiện hiệu suất ứng dụng. Dưới đây là cơ chế caching cơ bản của React Query:

1. Cache store: React Query sử dụng một cache store để lưu trữ dữ liệu đã được lấy từ các query trước đó. Cache store lưu trữ dữ liệu đưới dạng key-value pairs (pairs có nghĩa là theo cặp => key-value), trong đó key là query key và value là dữ liệu tương ứng.

2. Cache Expiration: Mỗi query trong React Query có một thời gian hết hạn (stale time) được định nghĩa. Sau khi thời gian này đã qua, dữ liệu trong cache sẽ được coi là đã lỗi thời và cần được cập nhật lại. Khi có một query mới với cùng query key, React Query sẽ tự động gọi query function để lấy dữ liệu mới từ nguồn dữ liệu bên ngoài.

3. Cache Invalidation: Cache invalidation (hết hạn) là quá trình xóa dữ liệu trong cache khi dữ liệu trên nguồn dữ liệu bên ngoài thay đổi. Khi thực hiện một mutation thành công, React Query tự động xóa dữ liệu liên quan từ cache (tức là xóa dữ liệu trong cache cũ) để đảm bảo rằng dữ liệu mới nhất sẽ được lấy trong các lần query tiếp theo.

4. Manual cache updates: (Cập nhật cache thủ công) Ngoài việc tự động cập nhật dữ liệu từ nguồn dữ liệu bên ngoài, React Query cũng cho phép bạn cập nhật dữ liệu trong cache một cách thủ công. Bằng cách sử dụng các hàm như `queryClient.setQueryData()` hoặc `queryClient.InvalidateQueries()`, bạn có thể thay đổi dữ liệu trong cache và điều khiển cách dữ liệu được sử dụng trong ứng dụng.

5. Selective cache Invalidation: (Vô hiệu hóa cache có chọn lọc) React Query cung cấp các phương pháp để xác định xem dữ liệu nào cần được xóa trong cache khi có sự thay đổi. Bằng cách sử dụng các tùy chọn như `refetchOnMount` trong useQuery, refetchOnWindowFocus trong (Window Focus Refetching) hoặc onSettled (trong useMutation) trong cấu hính của một query, bạn có thể chính xác xác định khi nào dữ liệu cần được cập nhật.

- Cơ chế caching của React Query giúp giảm số lần gọi API và tối ưu hiệu suất ứng dụng bằng cách sử dụng dữ liệu đã được lưu trữ trong cache. Điều này giúp giảm thời gian chờ đợi và tăng tốc độ phản hồi của ứng dụng.
