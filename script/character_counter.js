const textarea = document.querySelector('.sceditor-container textarea');
const maxChar = 650;
const initialCount = textarea.value.length;

var counter = document.createElement('span');
counter.className = 'counter';
counter.textContent = initialCount + ' / ' + maxChar; 
textarea.parentElement.appendChild(counter);

function changeCounter(e) {
  let currentCount = e.target.textLength;
  e.target.parentElement.style.transition = 'all 300ms ease';
  counter.textContent = currentCount + ' / ' + maxChar;

  if (currentCount > 0 && currentCount < 482) {
    e.target.parentElement.style.border = '3px solid #00a652';
  } else if (currentCount >= 482 && currentCount <= 690) {
    e.target.parentElement.style.border = '3px solid #f36523';
  } else if (currentCount > 690) {
    e.target.parentElement.style.border = '3px solid #ee1c25';
  }
}

textarea.addEventListener('keyup', changeCounter);

icons.forEach(icon => {
  img_ulr = icon.firstElementChild.src;
  icon.style = "background-image:" + img_url;
});