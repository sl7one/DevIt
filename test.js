const log = result => {
  console.log("res", result);
};

// //7. mapObject
// console.log("7. mapObject");

// const mapObject = obj => {
//   let res = {};
//   let keyMap = [];

//   const getKeys = obj => {
//     const entries = Object.entries(obj);
//     for (let [key, value] of entries) {
//       if (typeof value === "object") {
//         keyMap.push(key);
//         console.log("keyMap", keyMap);

//         if (Array.isArray(value)) return;

//         getKeys(value);
//       }

//       res = { ...res, [keyMap.join("/")]: value };

//       //   console.log(res)
//     }
//   };

//   getKeys(obj);
//   keyMap = [];
// };

// const obj = {
//   a: {
//     b: {
//       c: 12,
//       d: "Hello World",
//     },
//     e: [1, 2, 3],
//   },
//   g: {
//     z: 15,
//   },
// };
// // 'a/b/c': 12,
// // 'a/b/d': 'Hello World',
// // 'a/e': [1,2,3]

// log(mapObject(obj));

// console.log("_____________________________");
// console.log("");

//8. combos
console.log("8. combos");

// const combos = val => {
//   const res = [];
//   const arr = new Array(val).fill(1);
//   res.push([arr.length]);
//   res.push(arr);

//   const countSumm = arr => arr.reduce((acc, el) => acc + el, 0);
//   const initialSumm = countSumm(arr);

//   const newArray = arr;
//   const foo = () => {
//     for (const el of newArray) {
//     //   const summ = countSumm(newArray);
//       const lastItem = arr[arr.length - 1];
//       newArray.pop();
//       newArray[arr.length - 1] += lastItem;
//       console.log(newArray);
//       res.push(newArray);
//     }
//   };
//   foo();

//   return arr;
// };

// log(combos(4));

// console.log("_____________________________");
// console.log("");


// function combos(num) {
//     const result = [];
  
//     function findCombos(remaining, currentCombo, start) {
//       if (remaining === 0) {
//         result.push(currentCombo.slice()); // Копируем текущую комбинацию в результат
//         return;
//       }
  
//       for (let i = start; i <= num; i++) {
//         if (i <= remaining) {
//           currentCombo.push(i);
//           findCombos(remaining - i, currentCombo, i);
//           currentCombo.pop(); // Удаляем последний элемент для создания новой комбинации
//         } else {
//           break; // Прекращаем итерацию, если i больше, чем оставшаяся сумма
//         }
//       }
//     }
  
//     findCombos(num, [], 1); // Начинаем с 1, так как числа должны быть положительными
  
//     return result;
//   }
  
//   console.log(combos(3));
//   console.log(combos(10));