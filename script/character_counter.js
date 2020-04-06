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


/**
 * Use in RP section to alert when a message is too long than authorized
 * @param {array} allMsg 
 */
function addBorderOnTooLongMsg(allMsg) {
  var firstMsgTotalChar = allMsg[0].textContent.length;
  if (firstMsgTotalChar > 0 && firstMsgTotalChar <= 1444) {
    allMsg[0].style.border = 'none';
  } else {
    allMsg[0].style.border = '3px solid #ee1c25';
  }

  var allMsgArr = Array.from(allMsg);
  allMsgArr.shift();

  allMsgArr.forEach(msg => {
    var totalChar = msg.textContent.length;
    if (totalChar > 0 && totalChar < 482) {
      msg.style.border = 'none';
    } else if (totalChar >= 482 && totalChar <= 690) {
      msg.style.border = '3px solid #a963a9';
    } else {
      msg.style.border = '3px solid #ee1c25';
    }
  });
}

