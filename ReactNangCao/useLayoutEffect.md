# useLayoutEffect

Cách dùng `useLayoutEffect` tương tự như `useEffect`, nhưng callback bên `useLayoutEffect` sẽ chạy sau khi render và trước khi trình duyệt paint

99% trong các trường hợp chúng ta sẽ dùng `useEffect`, vậy chúng ta dùng `useLayoutEffect` khi nào?

Khi browser của chúng ta bị hiện tượng flicker (chớp nháy) do chúng ta thay đổi state quá nhanh.

Không nên dùng useLayoutEffect để thực hiện các effect như fetchAPI rồi set lại state, vì dùng useLayoutEffect chạy đồng bộ, nó sẽ làm app bị blocking. Hầu hết các effect chúng ta không cần tạm ngưng để chạy, có thể chạy bất đồng bộ, vậy nên dùng useEffect thì hợp lý hơn

Tham khảo: [https://daveceddia.com/useeffect-vs-uselayouteffect/](https://daveceddia.com/useeffect-vs-uselayouteffect/)

# Khái niệm về useLayoutEffect rõ ràng, chi tiết nhất?

- Trong React hook useLayoutEffect() được sử dụng để thực hiện các side-effect sau khi DOM đã được cập nhật nhưng trước khi giao diện người dùng được render lại.

- Các side effect bao gồm các thao tác trên DOM như tính toán layout, đọc kích thước của phần tử, hoặc thực hiện các thao tác đồng bộ khác.

- Sự khác biệt giữa useLayoutEffect() và useEffect là useLayoutEffect() sẽ được gọi ngay sau khi DOM cập nhật nhưng trước khi trình duyệt render lại giao diện. Trong khi đó, useEffect() sẽ được gọi sau khi trình duyệt đã render lại giao diện.

- 👉 Vì vậy, nếu bạn muốn thực hiện các `side-effect` liên quan đến `kích thước`, `vị trí` của phần tử hay muốn áp dụng các `thay đổi trực tiếp` lên DOM, thì `useLayoutEffect()` là lựa chọn tốt hơn. Tuy nhiên, cần lưu ý rằng sử dụng `useLayoutEffect()` có thể `gây chậm trễ` cho trang web của bạn, do đó cần cân nhắc và sử dụng một cách cẩn thận.

**_- 👉 Dưới đây là một ví dụ đơn giản về cách sử dụng hook `useLayoutEffect()`:_**

```jsx
import React, {useLayoutEffect, useState} from "react";

function Example() {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Gán giá trị ban đầu cho width
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Chỉ chạy effect một lần

    return <div>With: {with}</div>;
}
```

- 👉 Trong ví dụ trên, hook `useLayoutEffect()` được sử dụng để `cập nhật` giá trị của `width` khi kích thước trình duyệt thay đổi. Khi hook được gọi lần đầu tiên (một lần duy nhất do mảng tham số thứ 2 là một mảng rỗng), giá trị ban đầu của `width` sẽ được gán bằng kích thước của cửa sổ trình duyệt. Sau đó, một `event listener` sẽ được thêm vào để lắng nghe sự kiện `resize` của trình duyệt và `cập nhật` giá trị của `width`. Khi component bị `unmount`, `event listener` sẽ được loại bỏ để tránh `leak memory`.

## Dưới đây là một số ví dụ cơ bản về useLayoutEffect và giải thích code chi tiết để bạn hiểu rõ hơn:

**- 👉 Ví dụ 1: Sử dụng useLayoutEffect để đảm bảo tính nhất quán của giao diện.**

```jsx
import { useState, useLayoutEffect } from "react";

function Component() {
  const [color, setColor] = useState("red");

  useLayoutEffect(() => {
    setColor("blue");
  }, []);

  return (
    <div style={{ backgroundColor: color }}>
      <h1>Hello world!</h1>
    </div>
  );
}
```

- 👉 Ở ví dụ này, chúng ta sử dụng useState hook để khởi tạo một state color và sử dụng useLayoutEffect hook để thay đổi giá trị của state color thành màu xanh (blue) khi component được render lần đầu tiên (vì chúng ta truyền một mảng rỗng làm tham số thứ hai cho useLayoutEffect). Tuy nhiên, chúng ta không sử dụng useEffect mà sử dụng useLayoutEffect để đảm bảo rằng thay đổi màu sắc của component được áp dụng ngay lập tức mà không có delay.

**- 👉 Ví dụ 2: Sử dụng useLayoutEffect để tính toán vị trí của element trong DOM.**

```jsx
import { useState, useLayoutEffect, useRef } from "react";

function Component() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef();

  useLayoutEffect(() => {
    const { x, y } = ref.current.getBoundingClientRect();
    setPosition({ x, y });
  }, []);

  return (
    <div ref={ref}>
      <h1>
        My position is ({position.x}, {position.y})
      </h1>
    </div>
  );
}
```
- Ở ví dụ này, chúng ta sử dụng useState hook để khởi tạo một state position và sử dụng useLayoutEffect hook để tính toán vị trí của element được tham chiếu bởi ref (sử dụng hàm getBoundingClientRect()) và cập nhật giá trị của state position. Chúng ta sử dụng một mảng rỗng làm tham số thứ hai cho useLayoutEffect để đảm bảo rằng tính toán được thực hiện ngay sau khi component được render lần đầu tiên.