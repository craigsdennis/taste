import EventEmitter from "events";
import { aThing } from "aframework";

const fileSystem = require("fs");
const somethingLocal = require("./jk/lol");

const exampleArray = ['hello', 'world'];

exampleArray.forEach(console.log, console);

function usingRest(...theseAreRestArgs) {
    console.log("Rest args", theseAreRestArgs);
}

setTimeout(() => console.log("Hello"), 1000);

function holdItNow() {
    return new Promise((resolve, reject) => {
        resolve("Hit it!");
    })
}

class Yep {
    aMethod() {
        return 42;
    }
}

holdItNow.then(console.log).catch(err => 'me if you can');

const collection1 = new Map();
const collection2 = new Set();
const collection3 = new WeakMap();
const collection4 = new WeakSet();

function* letters(word) {
    for (let letter of word) {
        yield letter;
        console.log("Whee");
    }
}

for (let letter of letters("antidisestablishmentantarianism")) {
    console.log(letter);
}


