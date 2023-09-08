"use strict";
const log = (result) => {
    console.log(result);
};
console.log("1. DeepEqual");
const deepEqual = (val1, val2) => {
    if (JSON.stringify(val1) === JSON.stringify(val2)) {
        return true;
    }
    return false;
};
log(deepEqual({ name: "test" }, { name: "test" }));
log(deepEqual({ name: "test" }, { name: "test1" }));
log(deepEqual({ name: "test", data: { value: 1 } }, { name: "test", data: { value: 2 } }));
log(deepEqual({ name: "test" }, { name: "test", age: 10 }));
console.log("_____________________________");
console.log("");
console.log("2. chunkArray");
const chunkArray = (array, counter) => {
    let idx = 0;
    return {
        next: () => {
            const start = idx * counter;
            const end = start + counter;
            if (start < array.length) {
                const result = { value: array.slice(start, end), done: false };
                idx++;
                return result;
            }
            else {
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
const f1 = (cb) => {
    return cb(1);
};
const f2 = (a, cb) => {
    return cb(a);
};
const f3 = (a, b, cb) => {
    setTimeout(() => {
        return cb([a, b]);
    }, 1000);
};
function bulkRun(arr) {
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
const arrayToObject = (array) => {
    let res = {};
    array.forEach(([name, value]) => {
        if (Array.isArray(value))
            return (res = Object.assign(Object.assign({}, res), { [name]: arrayToObject(value) }));
        res = Object.assign(Object.assign({}, res), { [name]: value });
    });
    return res;
};
log(arrayToObject(arr));
console.log("_____________________________");
console.log("");
console.log("5. objectToArray");
const objectToArray = (obj) => {
    let res = [];
    const entries = Object.entries(obj);
    entries.forEach(([key, value]) => {
        if (typeof value === "object")
            return res.push([key, objectToArray(value)]);
        res.push([key, value]);
    });
    return res;
};
log(objectToArray({
    name: "developer",
    age: 5,
    skills: {
        html: 4,
        css: 5,
        js: 5,
    },
}));
console.log("_____________________________");
console.log("");
console.log("7. mapObject");
function mapObject(obj, prefix = "") {
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => {
        const newKey = prefix ? `${prefix}/${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            const nested = mapObject(obj[key], newKey);
            Object.assign(acc, nested);
        }
        else {
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
console.log("8. combos");
function combos(num) {
    const res = [];
    function findCombos(remaining, currentCombo, start) {
        if (remaining === 0)
            return res.push(currentCombo.slice());
        for (let i = start; i <= num; i++) {
            if (i <= remaining) {
                currentCombo.push(i);
                findCombos(remaining - i, currentCombo, i);
                currentCombo.pop();
            }
            else {
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
console.log("9. Add");
const add = (x) => {
    let sum = x;
    const inner = (y) => {
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
console.log("6. reliableMultiply");
function NotificationException() {
    return "notification";
}
function ErrorException() {
    return "error";
}
function primitiveMultiply(a, b) {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    }
    else if (rand > 0.85) {
        throw ErrorException();
    }
    else {
        throw NotificationException();
    }
}
function reliableMultiply(a, b) {
    try {
        return primitiveMultiply(a, b);
    }
    catch (error) {
        if (error === "notification") {
            return reliableMultiply(a, b);
        }
        else {
            throw error;
        }
    }
}
log(reliableMultiply(8, 8));
console.log("_____________________________");
console.log("");
//# sourceMappingURL=index.js.map