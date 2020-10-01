const url = 'http://www.mrsoft.by/data.json'
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const output = document.getElementById('output')
const lengthBtn = document.getElementById('lengthBtn')
const wordsBtn = document.getElementById('wordsBtn')
const input = document.getElementById('input')
const checkbox = document.getElementById('checkbox')
const refresh = document.getElementById('refresh')
const regex = /^[0-9]*$/gm;

const getAllWords = () => {
  fetch(proxyurl + url)
  .then(response => response.json())
  .then(res => {
    output.textContent = res.data.join(', ')
  })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

getAllWords();

lengthBtn.addEventListener('click', () => {
  if (+input.value.match(regex)) {
    let array = output.textContent.split(', ')
    array = array.filter(word => word.length > +input.value)
    output.textContent = array.join(', ')
    input.value = '';
    input.placeholder = 'Type anything'
  } else {
    input.value = '';
    input.placeholder = 'Please, type a number'
  }
})

wordsBtn.addEventListener('click', () => {
  input.placeholder = 'Type anything'
  let array = output.textContent.split(', ')
  if (checkbox.checked) {
    array = array.filter(word => word.match(input.value))
  } else {
    array = array.filter(word => word.toUpperCase().match(input.value.toUpperCase()))
  }
  output.textContent = array.join(', ')
  input.value = '';
})

refresh.addEventListener('click', getAllWords)