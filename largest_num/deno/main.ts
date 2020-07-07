import { readFileStr } from "https://deno.land/std/fs/mod.ts";

const file = await readFileStr("numbers");

const numbers = file.split("\n").map((n) => +n);
const max = Math.max(...numbers);

console.log(max);
