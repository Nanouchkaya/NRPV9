// Display submenu on click event
function toggleMenu(itemsLv1) {
  itemsLv1.forEach(itemLv1 => {
    itemLv1.addEventListener('click', (e) => {
      var itemsLv2 = Array.from(e.target.children);
      itemsLv2.forEach(itemLv2 => {
        itemLv2.classList.toggle('visible');
      });
    })
  });
}

// Display content from url in popup content bloc  
function displayMessage(links) {
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log(e);
      var url = e.target.dataset.url;
      fetchMessage(url).catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });
    })
  });
}

// Get post html content and add it to popup
async function fetchMessage(url) {
  console.log(url);
  let response = await fetch(url);
  let html = await response.text();
  
  // Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

  // Get the message content
  var idMsg = url.split('#')[1];
  var text = doc.getElementById('msg-'+ idMsg);
  var target = document.querySelector('.popup-content');
  target.textContent = '';
  console.log(text);
  target.appendChild(text);
}

// fetch('/t91-test-nm-x-men#409').then(function (response) {
// 	// The API call was successful!
// 	return response.text();
// }).then(function (html) {

// 	// Convert the HTML string into a document object
// 	var parser = new DOMParser();
// 	var doc = parser.parseFromString(html, 'text/html');

// 	// Get the image file
// 	var text = doc.querySelector('.post-body-content > div');
// 	console.log(text);

// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });


