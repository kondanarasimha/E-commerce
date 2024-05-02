import { fromatCurrency } from "../scripts/utils/money.js";

console.log('test suit: formate currency');

console.log('converts cents into dollars');

if(fromatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('work with 0');

if(fromatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearst cent');

if(fromatCurrency(2000.5)==='20.01') {
  console.log('passed');
} else {
  console.log('failed');
}
