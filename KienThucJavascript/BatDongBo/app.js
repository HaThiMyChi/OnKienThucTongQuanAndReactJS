// Bất đồng bộ với Promise và Async Await

// js
// async callback thông thường

/*setTimeout(() => {
    console.log("hello");
}, 1000);

*/

// Chuyển thành promise
const p = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello");
        }, 1000);
    });

p()
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.log(error); 
    })
    .finally(() => {
        console.log("Finish!");
    });
    
console.log("Chay truoc tien");

/*
## Async / await
- await chỉ sử dụng được trong một async function
- Chỉ sử dụng await với Promise

*/

const promiseFunc2 = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Hello promiseFunc2');
        }, 1000);
    });

const handle = async () => {
    try {
        const value = await promiseFunc2();
        console.log("Async await:", value)
    } catch (error) {
        console.warn("Async await:", error)
    } finally {
        console.log("Async await:", "Finally");
    }
};

handle();
