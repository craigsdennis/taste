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
