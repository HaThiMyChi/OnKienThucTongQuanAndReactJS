# useMemo

Chúng ta dùng `useMemo` khi chúng ta muốn một biến không bị làm mới lại mỗi lần component re-render

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo` nhận vào các dependency để quyết định có chạy callback hay không tương tự như bên `useEffect`

## Định nghĩa useMemo chi tiết và dễ hiểu nhất:

- useMemo là một hook của React, nó được sử dụng để tối ưu hóa hiệu suất khi tính tóa các giá trị phức tạp trong functional component.

- Khi bạn tính toán một giá trị phức tạp trong một functional component, mỗi khi component re-render thì giá trị đó sẽ bị tính toán lại, dẫn đến tốn nhiều tài nguyên và làm chậm hiệu suất của ứng dụng. Vì vậy, useMemo được sử dụng để giữ lại giá trị tính toán và sử dụng lại nó nếu các đối số không thay đổi.

- Cách sử dụng useMemo là bạn truyền vào một hàm và một mảng các giá trị đối số. useMemo sẽ trả về kết quả của hàm tính toán, nếu các giá trị đối số không thay đổi, giá trí trả về được lưu trữ và sử dụng lại trong các lần re-render tiếp theo.

- Ví dụ, nếu bạn có một component sử dụng một mảng dữ liệu để tính toán số lượng phần tử và bạn muốn giữ lại giá trị tính toán để sử dụng lại trong các lần re-render tiếp theo, bạn có thể sử dụng useMemo như sau:

```jsx
import React, {useMemo} from 'react';

function MyComponent({data}) {
    const count = useMemo(() => {
        console.log("counting...");
        return data.length;
    }, [data]);
    return <p>There are {count} elements in the data.</p>;
}
```

- ở đây, hàm được truyền vào useMemo sẽ được gọi để tính toán giá trị của biến count. Nếu mảng data không thay đổi giữa các lần render, giá trị của count sẽ được lưu trữ và sử dụng lại trong các lần re-render tiếp theo.

## Chúng ta dùng `useMemo` khi chúng ta muốn một `biến` không bị làm mới lại mỗi lần component re-render câu này đúng hay sai?

- Câu này đúng `useMemo` được sử dụng để tránh tính toán lặp lại một giá trị khi một component re-render, giúp tăng hiệu suất của ứng dụng. Khi sử dụng `useMemo`, giá trị được tính toán một lần và được lưu trữ trong bộ nhớ đến khi một trong các giá trị phụ thuộc thay đổi, khi đó giá trị mới sẽ được tính toán lại.

## Tại sao lại là 1 biến mà không phải thứ khác ?

- 👉 `useMemo` cho phép chúng ta tạo ra một giá trị được tính toán trước và lưu lại trong bộ nhớ, và giá trị này sẽ không bị tính toán lại trong các lần re-render tiếp theo của component nếu các giá trị dependencies không thay đổi. Giá trị này có thể là bất cứ thứ gì, từ một giá trị đơn giản đến một object hoặc một mảng.

- 👉 Do đó, khi chúng ta sử dụng `useMemo`, chúng ta thường tạo ra một biến để lưu trữ giá trị tính toán trước đó. Khi component re-render, giá trị này sẽ được trả về thay vì tính toán lại từ đầu.

## Đây là một số ví dụ về cách sử dụng `useMemo`:

**1. Tính toán giá trị của một biến phức tạp trong một hàm component**

```jsx
import React, {useMemo, useState} from "react";

function Component() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    // tinh toan gia tri cua bien c dua tren gia tri cua a va b
    const c = useMemo(() => {
        console.log("Tinh toan c");
        return a + b;
    }, [a, b]);

    return (
        <div>
            <p>a: {a}</p>
            <p>b: {b}</p>
            <p>c: {c}</p>
            <button onClick={() => setA(a + 1)}>Tăng a</button>
            <button onClick={() => setB(b + 1)}>Tăng b</button>
        </div>
    );
}
```

- Trong ví dụ này, giá trị của biến c được tính toán dựa trên giá trị của a và b. Tuy nhiên nếu a hoạc b thay đổi, giá trị của c sẽ được tính toán lại. Để tránh tính toán lại giá trị của c mỗi lần component re-render, chúng ta sử dụng useMemo để lưu trữ giá trị tính toán của c và chỉ tính toán lại khi a hoặc b thay đổi.

**2. Ví dụ tối ưu hóa việc render một danh sách các items:**

```jsx
import React, {useMemo, useState} from "react";

function Component() {
    const [items, setItems] = useState([
        {id: 1, name: "Item 1"},
        {id: 2, name: "Item 2"},
        {id: 3, name: "Item 3"},
    ]);
    const [searchTerm, setSearchTerm] = useState("");

    // Tim kiem cac items phu hop voi searchTerm
    const filteredItems = useMemo(() => {
        console.log("Tim kiem items");
        return items.filter((item) => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    return (
        <div>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button
                onClick={() =>
                    setItems([
                        ...items,
                        {id: items.length + 1, name: `Item ${items.length + 1}`},
                    ])
                }
            >
                Them item
            </button>
        </div>
    )
}
```

- Trong ví dụ này, chúng ta có một danh sách các items và một ô tìm kiếm để lọc danh sách theo từ khóa tìm kiếm. Khi người dùng nhập từ khóa tìm kiếm, danh sách sẽ được lọc lại và hiển thị các items phù hợp.

- Tuy nhiên, nếu chúng ta tìm kiếm mỗi lần người dùng nhập một ký tự mới, thì sẽ làm cho component render lại rất nhiều lần và gây lãng phí tài nguyên. Để giải quyết vấn đề này, chúng ta có thể sử dụng `useMemo` để giữ cho việc lọc danh sách chỉ được thực hiện khi danh sách hoặc từ khóa tìm kiếm thay đổi.

- Trong đoạn code, chúng ta sử dụng `useMemo` để lọc danh sách items phù hợp với từ khóa tìm kiếm. Hàm lọc này được chạy khi danh sách items hoặc từ khóa tìm kiếm thay đổi. Nếu danh sách items hoặc từ khóa tìm kiếm không thay đổi, giá trị được trả về từ hàm lọc sẽ được giữ lại và sử dụng lại cho render tiếp theo mà không phải thực hiện lại việc lọc.

- Như vậy, việc sử dụng `useMemo` giúp tối ưu việc render danh sách items khi có sự thay đổi trong từ khóa tìm kiếm mà không làm cho component render lại nhiều lần và tăng tốc độ hiển thị trên trình duyệt của người dùng.

`🚀🚀 Hãy giải thích chi tiết từng dòng code hơn, rõ rãng , cặn cẽ nhất:`

👉Dòng 1: Import useMemo và useState hook từ React.

👉Dòng 3-9: Tạo một component function đơn giản với hai state là items và searchTerm, lần lượt chứa một danh sách các items và từ khóa tìm kiếm.

👉Dòng 12-20: Sử dụng hook useMemo để tối ưu hóa việc render danh sách các items. Hàm truyền vào useMemo sẽ được gọi mỗi khi giá trị của các dependency thay đổi. Nếu không có sự thay đổi nào với các dependency, giá trị được trả về từ hook useMemo sẽ được sử dụng lại, không cần phải tính toán lại.

👉Dòng 14: In ra màn hình console khi chúng ta thực hiện tìm kiếm items để kiểm tra việc re-render của component.

👉Dòng 15-19: Dùng filter() để lọc ra các item phù hợp với từ khóa tìm kiếm, sau đó trả về một danh sách các items đã được lọc.

👉Dòng 22-23: Render một input và một danh sách các items đã được lọc. Khi giá trị của input thay đổi, hook useState sẽ được gọi lại, gây ra việc re-render của component.

👉Dòng 25-27: Render một button, khi được click, thêm một item mới vào danh sách. Khi danh sách items thay đổi, hook useState được gọi lại, gây ra việc re-render của component.

Nhờ hook useMemo, khi tìm kiếm các items, chúng ta không cần phải lọc toàn bộ danh sách items, mà chỉ cần lọc danh sách đã được lưu trữ trong biến filteredItems. Điều này giúp giảm thiểu việc tính toán lại trong quá trình re-render, giúp cải thiện hiệu suất của ứng dụng

**3. Tính toán phức tạp trong `component`.**

- Giả sử chúng ta có một component `ExpensiveCalculation` như sau:

```jsx
import React, { useState } from "react";

function ExpensiveCalculation({ a, b }) {
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    // Simulate a complex calculation
    const res = a * b;
    setResult(res);
  };

  return (
    <div>
      <button onClick={calculateResult}>Calculate Result</button>
      {result && <p>The result is {result}</p>}
    </div>
  );
}
```

- Trong component này, khi chúng ta click vào nút "Calculate Result", nó sẽ tính toán kết quả của `a*b` và hiển thị kết quả. Tuy nhiên, điều này có nghĩa là mỗi lần chúng ta re-render component này, hàm `calculateResult` cũng được chạy một lần để set state, bất chấp việc chúng ta không cần tính toán kết quả mới. Điều này làm tốn thời gian tính toán và làm chậm ứng dụng của chúng ta.

- Để giải quyết vấn đề này, chúng ta có thể sử dụng `useMemo` để lưu trữ kết quả của a \* b và chỉ tính toán lại khi a hoặc b thay đổi. Điều này giúp chúng ta tránh tính toán không cần thiết và tăng tốc độ re-render.

```jsx
import React, {useState, useMemo}  from "react";

function ExpensiveCalculation({a, b}) {
    const [result, setResult] = useState(null);

    const calculateResult = () => {
        const res = a * b;
        setResulut(res);
    }

    const memoizedResult = useMemo(() => {
        // Simulate a complex calculation
        return a * b;
    }, [a, b]);

    return (
        <div>
            <button onClick={calculateResult}>Calculate Result</button>
            {result && <p>The result is {result}</p>}
            <p>The memoized result is {memoizedResult}</p>
        </div>
    );
}
```

- Ở ví dụ này, chúng ta sử dụng `useMemo` để tính toán kết quả của a * b và lưu trữ kết quả đó vào biến `memoizedResult`. Biến này sẽ được tính toán lại chỉ khi a hoặc b thay đổi. Khi chúng ta click vào "Calculate Result", hàm `calculateResult` được gọi để tính toán và hiển thị kết quả mới. Tuy nhiên, việc này không ảnh hưởng đến kêt quả được lưu trữ trong `memoizedResult`, do đó chúng ta không phải tính toán lại giá trị này.
