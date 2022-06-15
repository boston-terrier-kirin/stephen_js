const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey,
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('input');

// 関数化しない場合
// let timeoutId;
// const onInput = (event) => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }

//   timeoutId = setTimeout(() => {
//     fetchData(event.target.value);
//   }, 1000);
// };
// ↓
// ↓

const debounce = (fn, delay = 1000) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

const onInput = (event) => {
  fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput));
