const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));

// コメントテキストすべて含めて
console.log('💨h1.childNodes');
console.log(h1.childNodes);
h1.childNodes.forEach((el) => {
  console.log(el);
});

// HTMLのみ
console.log('💨h1.children');
console.log(h1.children);
[...h1.children].forEach((el) => {
  console.log(el);
});

console.log('💨h1.firstElementChild');
console.log(h1.firstElementChild);
console.log('💨h1.lastElementChild');
console.log(h1.lastElementChild);

console.log('💨h1.parent');
console.log(h1.parentNode);
console.log(h1.parentElement);

console.log('💨h1.sibling');
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log('💨親から子供一覧');
[...h1.parentElement.children].forEach((el) => {
  console.log(el);
});
