export const getUser = () => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "Duy nghia dev",
          age: 21,
          address: "Da Nang"
        },
        status: 200,
      });
    }, 1500);
  })