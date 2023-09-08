//utils
const log = (result: any): void => {
  console.log(result);
};

//1. DeepEqual
console.log("1. DeepEqual");
const deepEqual = (val1: object, val2: object): boolean => {
  if (JSON.stringify(val1) === JSON.stringify(val2)) {
    return true;
  }
  return false;
};

//Althought you can use _.isEqual() method from Lodash library

log(deepEqual({ name: "test" }, { name: "test" }));
log(deepEqual({ name: "test" }, { name: "test1" }));
log(
  deepEqual(
    { name: "test", data: { value: 1 } },
    { name: "test", data: { value: 2 } }
  )
);
log(deepEqual({ name: "test" }, { name: "test", age: 10 }));
console.log("_____________________________");
console.log("");

//2. chunkArray
console.log("2. chunkArray");

type ChunkArrayType = {
  next: () => { value: any[] | undefined; done: boolean };
};

const chunkArray = (array: any[], counter: number): ChunkArrayType => {
  let idx: number = 0;
  return {
    next: () => {
      const start: number = idx * counter;
      const end: number = start + counter;

      if (start < array.length) {
        const result = { value: array.slice(start, end), done: false };
        idx++;
        return result;
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());

console.log("_____________________________");
console.log("");

//3. bulkRun
const f1 = (cb: (val: any) => void) => {
  return cb(1);
};

const f2 = (a: any, cb: (val: any) => void) => {
  return cb(a);
};

const f3 = (a: any, b: any, cb: (val: any) => void) => {
  setTimeout(() => {
    return cb([a, b]);
  }, 1000);
};

type ParamItem = [(...args: any[]) => void, any[]];
type ParamsType = ParamItem[];

function bulkRun(arr: ParamsType) {
  const promises = arr.map(([fn, args]) => {
    return new Promise(res => {
      fn(...args, res);
    });
  });

  return Promise.all(promises);
}

bulkRun([
  [f1, []],
  [f2, [2]],
  [f3, [3, 4]],
]).then(r => {
  console.log("3. bulkRun");
  log(r);
  console.log("_____________________________");
  console.log("");
});

//4. arrayToObject
console.log("4. arrayToObject");

const arr = [
  ["name", "developer"],
  ["age", 5],
  [
    "skills",
    [
      ["html", 4],
      ["css", 5],
      ["js", 5],
    ],
  ],
];

const arrayToObject = (array: any[]): object => {
  let res = {};

  array.forEach(([name, value]: [name: string, value: string | []]) => {
    if (Array.isArray(value))
      return (res = { ...res, [name]: arrayToObject(value) });

    res = { ...res, [name]: value };
  });

  return res;
};

log(arrayToObject(arr));

console.log("_____________________________");
console.log("");

//5. objectToArray
console.log("5. objectToArray");

const objectToArray = (obj: object): any[] => {
  let res: any[] = [];
  const entries = Object.entries(obj);

  entries.forEach(([key, value]: [key: string, value: string | object]) => {
    if (typeof value === "object") return res.push([key, objectToArray(value)]);

    res.push([key, value]);
  });

  return res;
};

log(
  objectToArray({
    name: "developer",
    age: 5,
    skills: {
      html: 4,
      css: 5,
      js: 5,
    },
  })
);

console.log("_____________________________");
console.log("");



//7. mapObject
console.log("7. mapObject");

function mapObject(obj: {[key: string]: any}, prefix = "") {
  const keys = Object.keys(obj);

  return keys.reduce((acc:{[key: string]: any}, key:string) => {
    const newKey = prefix ? `${prefix}/${key}` : key;

    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const nested = mapObject(obj[key], newKey);
      Object.assign(acc, nested);
    } else {
      acc[newKey] = obj[key];
    }

    return acc;
  }, {});
}



log(mapObject({
  a: {
    b: {
      c: 12,
      d: "Hello World",
    },
    e: [1, 2, 3],
  },
}));

console.log("_____________________________");
console.log("");

// 8. combos
console.log("8. combos");

function combos(num: number) {
  const res:number[][]  = [];

  function findCombos(remaining:number, currentCombo: number[], start: number) {
    if (remaining === 0) return res.push(currentCombo.slice());

    for (let i = start; i <= num; i++) {
      if (i <= remaining) {
        currentCombo.push(i);
        findCombos(remaining - i, currentCombo, i);
        currentCombo.pop(); 
      } else {
        break; 
      }
    }
  }

  findCombos(num, [], 1); 
  return res;
}

log(combos(3));
log(combos(10));

console.log("_____________________________");
console.log("");

//9. Add
console.log("9. Add");

const add = (x: number) => {
  let sum = x;

  const inner = (y: number) => {
    sum += y;
    return inner;
  };

  inner.valueOf = () => {
    return sum;
  };

  return inner;
};

log(Number(add(1)(2)));
log(Number(add(1)(2)(5)));
log(Number(add(1)(2)(-3)(4)));
log(Number(add(1)(2)(3)(4)(-5)));
console.log("_____________________________");
console.log("");


//6. reliableMultiply
console.log("6. reliableMultiply");

function NotificationException(): string {
  return "notification";
}
function ErrorException(): string {
  return "error";
}
function primitiveMultiply(a: number, b: number) {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if (rand > 0.85) {
    throw ErrorException();
  } else {
    throw NotificationException();
  }
}

function reliableMultiply(a: number, b: number) {
  try {
    return primitiveMultiply(a, b);
  } catch (error) {
    if (error === "notification") {
      return reliableMultiply(a, b);
    } else {
      throw error;
    }
  }
}

log(reliableMultiply(8, 8));

console.log("_____________________________");
console.log("");