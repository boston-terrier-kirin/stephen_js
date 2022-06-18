const root = document.querySelector('#root');

/**
 * appendならテキストもNodeも追加できる
 */
root.append('TEST');

try {
  root.appendChild('TEST');
} catch (error) {
  console.log('appendChildで文字列の追加はできない');
}

/**
 * append
 */
const h1 = document.createElement('h1');
h1.innerText = 'World';
root.append(h1);

/**
 * appendChihld
 */
const h2 = document.createElement('h2');
h2.innerText = 'Yes, We can';
root.appendChild(h2);

/**
 * insertBefore
 */
{
  const foods = document.querySelector('#foods');
  const firstLi = document.querySelector('#foods li');
  const newLi = document.createElement('li');
  newLi.innerText = 'カレー';

  // 親をselectして、追加したいもの, どこに追加するかを指定する。
  foods.insertBefore(newLi, firstLi);
}

/**
 * insertAdjacentElement
 */
{
  const foods = document.querySelector('#foods');
  const newLi = document.createElement('li');
  newLi.innerText = 'つけめん';

  // 'beforebegin': targetElement 自体の前。
  // 'afterbegin': targetElement の直下、最初の子の前。
  // 'beforeend': targetElement の直下、最後の子の後。
  // 'afterend': targetElement 自体の後。
  foods.insertAdjacentElement('beforeend', newLi);
}

/**
 *appendは一番下
 */
{
  const foods = document.querySelector('#foods');
  const newLi = document.createElement('li');
  newLi.innerText = 'ぎょうざ';

  foods.append(newLi);
}

/**
 *prependは先頭
 */
{
  const foods = document.querySelector('#foods');
  const newLi = document.createElement('li');
  newLi.innerText = '焼肉';

  foods.prepend(newLi);
}

/**
 * children
 */
{
  const foods = document.querySelector('#foods');
  for (const food of foods.children) {
    console.log(food.innerText);
    food.innerText = '❤ ' + food.innerText;
  }
}

/**
 * nextElementSibling
 */
{
  const firstLi = document.querySelector('#foods li');
  const secondLi = firstLi.nextElementSibling;
  console.log(firstLi.innerText);
  console.log(secondLi.innerText);
}
