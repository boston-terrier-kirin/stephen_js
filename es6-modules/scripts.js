import { cart, addToCart } from './shoppingCart.js';

console.log('OK');

addToCart('缶詰', 3);

/**
 * JSのimportはLive Connectionなので、先頭でimportしたcartの値は変わってしまうのがポイント。
 * importした時点でのコピーではない。
 */
console.log(cart);

/**
 * moduleの中であれば、top level await ができる。
 */
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = await res.json();

console.log(data);
