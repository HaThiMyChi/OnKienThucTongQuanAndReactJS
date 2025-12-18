## Dưới đây là một ví dụ về cách sử dụng `Query Instance`, `Fetch ngaamf`, `các inactive query` và `xóa cache khỏi bộ nhớ` trong React Query:

```jsx
import { useQuery, useQueryClient } from "react-query";

// Hook để lấy danh sách bài viết từ API

const fetchPosts = async () => {
  const response = await fetch("api/posts");
  const data = await response.json();
  return data;
};

function PostList() {
  const queryClient = useQueryClient();

  // Sử dụng Query Instance để lấy danh sách bài viết và lưu kết quả vào cache
  const postsQuery = useQuery("posts", fetchPosts, {
    staleTime: 60000, // Thời gian hết hạn cache là 60 giấy (1 phút)
    refetchOnMount: false, // Không làm mới dữ liệu khi mount component
    refetchOnWindowFocus: false, // Không làm mới dữ liệu khi focus vào cửa sổ trình duyệt
    refetchOnReconnect: false, // Không làm mới dữ liệu khi reconnect internet

    onSuccess: () => {
      // Lập lịch Fetch ngầm sau mỗi 5 giây
      const interval = setInterval(() => {
        postsQuery.fetchInBackground();
      }, 50000);

      // Lưu interval trong queryClient để có thể xóa khi cần thiết
      queryClient.setQueryData("backgroundFetchInterval", interval);
    },
  });

  // Xóa cache khi component bị unmount
  useEffect(() => {
    return () => {
      // Xóa cache của query 'posts'
      queryClient.removeQueries("posts");

      // Xóa interval của fetch ngầm
      clearInterval(queryClient.getQueryData("backgroundFetchInterval"));
    };
  }, []);

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

- Trong ví dụ trên, chúng ta sử dụng Query Instance để lấy danh sách bài viết từ server và lưu kết quả vào cache. Chúng ta cấu hình các tùy chọn cho Query Instance như `staleTime` dể định thời gian hết hạn của cache, `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect` để quyết định khi nào cần làm mới dữ liệu.

- Chúng ta cũng sử dụng `onSuccess` để lập lịch fetch ngầm sau mỗi 5 giây bằng cách gọi `postsQuery.fetchInBackground()`. Kết quả từ fetch ngầm sẽ không ảnh hướng đến giao diện người dùng trực tiếp, nhưng nó sẽ cập nhật cache và dữ liệu mới sẽ được sử dụng khi cần thiết.

- Khi component bị unmount, chúng ta sử dụng `useEffect` để xóa cache của query `posts` và xóa `interval` của fetch ngầm để tránh việc tiêu thụ tài nguyên không cần thiết.

## Trong đoạn code đó có "posts" là queryKey, fetchPosts là queryFn hả ?

- Đúng, trong đoạn code trên `posts` được sử dụng làm queryKey và fetchPosts được sử dụng làm queryFn

  - queryKey là một giá trị duy nhất để xác định một query trong React Query. Nó có thể là một chuỗi, một mảng, hoặc một object. Trong ví dụ trên, chúng ta sử dụng `posts` làm queryKey để định danh cho query lấy danh sách bài viết.

  - queryFn là một hàm mà React Query sẽ gọi để thực hiện lấy dữ liệu từ server. Trong ví dụ trên, `fetchPosts` là một hàm không đồng bộ (async function) để gọi API và lấy danh sách bài viết từ server.

- Khi chúng ta sử dụng `useQuery` và cung cấp `queryKey` và `queryFn`, React Query sẽ quản lý việc lưu cache, làm mới dữ liệu và cung cấp các trạng thái và kết quả tương ứng để sử dụng trong giao diện người dùng.

## Giải thích chi tiết đoạn code trên: 👆👆👆

- Dưới đây là tách nhỏ đoạn code và giải thích từng phần:

1. Import các hàm và hook từ thư viện React Query:

```jsx
import { useQuery, useQueryClient } from "react-query";
```

- `useQuery` là một hook để thực hiện một query và quản lý các trạng thái của nó
- `useQueryClient` là một hook để truy cập và thao tác với queryClient, một đối tượng quản lý các query và cache.

2. Định nghĩa hàm `fetchPosts` để lấy danh sách bài viết từ API:

```jsx
const fetchPosts = async () => {
  const response = await fetch("api/posts");
  const data = await response.json();
  return data;
};
```

- Hàm `fetchPosts` sử dụng `fetch` để gọi API và trả về một promise chứa dữ liệu bài viết.

3. Định nghĩa component `PostList`:

```jsx
function PostList() {
    const queryclient = useQueryClient();

```

- Sử dụng `useQueryClient` để lấy reference (tham chiếu) đến việc thao tác với `queryClient` và lưu vào biến queryClient.

4. Sử dụng `Query Instance` để lấy danh sách bài viết và lưu kết quả vào cache:

```jsx
const postsQuery = useQuery("posts", fetchPosts, {
  staleTime: 60000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  onSuccess: () => {
    // ...
  },
});
```

- `useQuery` nhận vào `queryKey`, `queryFn` và các tùy chọn để tạo một `Query Instance`.
- posts là queryKey để định danh cho query lấy danh sách bài viết.
- fetchPosts là queryFn để gọi hàm lấy dữ liệu từ API
- Các tùy chọn được cấu hình như `staleTime`, `refetchOnMount`, `refetchOnWindowFocus`, và `refetchOnReconnect` để quyết định cách làm mới dữ liệu.

5. Xóa cache khi component bị unmount:

```jsx
useEffect(() => {
  return () => {
    // Xóa cache của query 'posts'
    queryClient.removeQueries("posts");

    // Xóa interval của fetch ngầm
    clearInterval(queryClient.getQueryData("backgroundFetchInterval"));
  };
}, []);
```

- Sử dụng useEffect để xóa cache và clear interval khi componnet bị unmount.

6. Xử lý các trạng thái và hiển thị danh sách bài viết:

```jsx
if (postsQuery.isLoading) {
  return <div>Loading...</div>;
}

if (postsQuery.isError) {
  return <div>Error: {postsQuery.error.message}</div>;
}

return (
  <div>
    <h1>Post List</h1>
    <ul>
      {postsQuery.data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </div>
);
```

- Kiểm tra trạng thái `isLoading` để hiển thị thông báo `"Loading..."` khi query đang trong quá trình `fetching` dữ liệu.
- Kiểm tra trạng thái `isError` để hiển thị thông báo lỗi và message lỗi tương ứng.
- Hiển thị danh sách bài viết từ `postsQuery.data`.

- Đoạn code trên sử dụng React Query để lấy danh sách bài viết từ API, lưu kết quả vào cache, và cung cấp các trạng thái và kết quả tương ứng để hiển thị trong giao diện người dùng. Ngoài ra, nó cũng xử lý việc làm mới dữ liệu tự động với fetch ngầm và xóa cache khi component bị unmount để tối ưu tài nguyên và tránh việc lấy dữ liệu không cần thiết

## Hãy lấy ví dụ: Giả sử chúng ta dùng `cacheTime` mặc định là `5 phút` và `staleTime` là `0`.

- Giả sử chúng ta dùng `cacheTime` mặc định là 5 phút và `staleTime` là 0, điều này có nghĩa rằng dữ liệu được lấy từ server sẽ được lưu vào cache và sẽ được coi là hết hạn sau 5 phút.

- Khi một query được gọi và dữ liệu được lấy từ cache, React Query sẽ kiểm tra thời gian hết hạn (`cacheTime`). Nếu dữ liệu chưa hết hạn, React Query sẽ trả về dữ liệu từ cache ngay lập tức mà không thực hiện một request mới đến server.

- Tuy nhiên, nếu `staleTime` được đặt là 0, khi thời gian hết hạn cache, React Query sẽ đánh dấu query là `stale` (cũ) và tiếp tục trả về dữ liệu từ cache trong lần render đầu tiên. Trong lần render đầu tiên sau khi query trở thành `stale`, React Query sẽ tự động bắt đầu gửi một request mới đến server để lấy dữ liệu mới nhất. Khi request hoàn thành và dữ liệu mới được trả về từ server, React Query sẽ cập nhật cache và cung cấp dữ liệu mới cho các component đã sử dụng query đó.

- Ví dụ:

```jsx
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch("api/posts");
  const data = await response.json();
  return data;
};

function PostList() {
  const { data } = useQuery("posts", fetchPosts, {
    cacheTime: 1000 * 60 * 5, // 5 phút
    staleTime: 0,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

- Trong ví dụ trên, khi component `PostList` được render lần đầu tiên, React Query sẽ gọi `fetchPosts` để lấy dữ liệu từ server và lưu vào cache. Khi `PostList` được render lại sau 5 phút, React Query sẽ trả về dữ liệu từ cache và bắt đầu gửi request mới đến server để lấy dữ liệu mới nhất

## ❌❌ Hãy hiểu rõ dòng này: React Query sẽ trả về dữ liệu từ cache và bắt đầu gửi request mới đến server để lấy dữ liệu mới nhất.

- Đúng, khi `PostList` được render lại sau 5 phút và dữ liệu từ cache đã hết hạn (`cacheTime`), React Query sẽ trả về dữ liệu từ cache trong lần render đầu tiên và tự động bắt đầu gửi một request mới đến server để lấy dữ liệu mới nhất. Quá trình này được gọi là "Fetch ngầm" (background fetching) vì nó xảy ra trong nền mà không làm gián đoạn giao diện người dùng.

- Khi request mới được gửi đến server và dữ liệu mới nhất được trả về, React Query sẽ cập nhật cache với dữ liệu mới và cung cấp dữ liệu này cho các component đã sử dụng query tương ứng. Điều này giúp đồng bộ dữ liệu của ứng dụng với server mà không làm gián đoạn trải nghiệm người dùng.

- Quá trình fetch ngầm là một tính năng mạnh mẽ của React Query, nó giúp tối ưu hiệu suất và đồng bộ dữ liệu tự động trong ứng dụng của bạn.

## ❌❌ Sau khi nó lấy dữ liệu mới nhất từ server và nó tiếp tục lưu trữ trong cache 5 phút. Sau khi hết 5 phút thì nó lại gửi yêu cầu đến server lại để lấy data mới. Vòng lặp nó là thế hả ?

- Đúng, bạn hiểu đúng.

- Điều này tạo ra một `vòng lặp tự dodongj`, trong đó React Query tự dộng làm mới dữ liệu từ `server` sau khi `cache` hết hạn. Vòng lặp này giúp dồng bộ dữ liệu của ứng dụng với `server` và đảm bảo rằng dữ liệu hiển thị luôn là phiên bản mới nhất.
