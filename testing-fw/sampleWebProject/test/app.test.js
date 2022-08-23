const assert = require('assert');

it('has a text input', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');

  assert(input);
});

it('shows a success message with a valid email', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  const form = dom.window.document.querySelector('form');

  input.value = 'test@test.com';
  form.dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Looks good!');
});

it('shows a error message with a invalid email', async () => {
  const dom = await render('index.html');
  const input = dom.window.document.querySelector('input');
  const form = dom.window.document.querySelector('form');

  input.value = 'testtest.com';
  form.dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'Invalid email');
});
