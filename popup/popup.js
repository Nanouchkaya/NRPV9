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



// Display submenu on click event
function toggleMenu(menu) {
  if(typeof menu === 'object' || typeof menu === 'array'){
    menu.forEach(itemLv1 => {
      itemLv1.addEventListener('click', (e) => {
        var itemsLv2 = Array.from(e.target.children);
        // second level of menu
        itemsLv2.forEach(itemLv2 => {
          itemLv2.classList.toggle('visible');
        });
      })
    });
  } else {
    menu.classList.toggle('visible');
  }
}

// Display content from url in popup content bloc  
function displayMessage(links) {
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log(e);
      var url = e.target.dataset.url;
      fetchMessage(url).catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
        // General message to inform user - error
        var errMsg = 'Oups! Il semblerait que les infos soient parties faire un tour... Tu peux les retrouver dans Vie du Forum. Bisous';
        var errElt = document.createElement('p');
        errElt.className = 'error';
        errElt.textContent = errMsg;
        document.querySelector('.popup-content').appendChild(errElt);
      });
    })
  });
}

// Fetch post html content and add it to popup
async function fetchMessage(url) {
  console.log(url);
  let response = await fetch(url);
  let html = await response.text();
  
  // Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

  // Get the message content
  var idMsg = url.split('#')[1];
  var text = doc.querySelector('#msg-'+ idMsg +' .post-popup');
  console.log(text + '#msg-'+ idMsg +' .post-popup');
  var target = document.querySelector('.popup-content');
  target.textContent = '';
  target.appendChild(text);
}

// Display Popup
/*
- selectionner les liens onglet
- poser un écouteur click
- afficher la popup et le overlay

- écouteur sur la croix 
- fermer popup et masquer overlay
*/

function togglePopup(e) {
  document.querySelector('.popup').classList.toggle('flex');
  document.querySelector('.jqmOverlay').classList.toggle('visible');
}