## ES6 Class

## Constructor function

```js
function Cat(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type
}
// Thêm method
Cat.prototype.meow = function () {
    console.log(`${this.name} meows: meow meow meow!`)
}

// Khởi tạo 1 instance object
let alex = new Cat('Alex', 'Yellow', 'Bengal')

elex.meow() // Alex meows: meow meow meow!
```

hoặc như thế này

```js
function Cat(name, color, type) {
    this.name = name;
    this.color = color;
    this.type = type;

    this.meow = function () {
        console.log(`${this.name} meows: meow meow meow!`)
    }
}

let alex = new Cat('Alex', 'Yellow', 'Bengal')
alex.meow() // Alex meows: meow meow meow!

```

## Class 
Class giúp gom các thuộc tính và phương thức lại, giúp code nhìn clean hơn

```js
class Cat {
    constructor(name, color, type) {
        // Tạo các thuộc tính (property)
        this.name = name;
        this.color = color;
        this.type = type;
    }

    // Them vao cac phuong thuc (method)
    meow() {
        console.log(`${this.name} meows: meow meow meow!`)
    }
}

let alex = new Cat('Alex', 'Yellow', 'Bengal')
alex.meow() // Alex meows: meow meow meow!