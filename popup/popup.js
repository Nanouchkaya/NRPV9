// Open popup on direct submenu content 
async function openPopup(e) {
  // 1 - get html from url and display it in popup
  var url = e.target.dataset.url;
  displayMessage(url);

  // 2 - display popup
  togglePopup();

  var popupNavLinks = document.querySelectorAll('.popup-nav li');
  popupNavLinks.forEach( popupNavLink => {
    // 3 - open submenu in popup nav
    if (url && url === popupNavLink.dataset.url) {
      showListElements(popupNavLink);
    }
    // 4 - update content from popup navigation
    else if(popupNavLink.dataset.url) {
      popupNavLink.addEventListener('click', async (e) => {
        var newUrl = e.target.dataset.url;
        displayMessage(newUrl);
      });
    }
    // 5 - show or hide submenu
    else if (popupNavLink.className === 'popup-list-lv1-item'
    ||popupNavLink.className === 'popup-list-lv1-item visible' ) {
      popupNavLink.addEventListener('click', toggleMenu);
    }
  });

  // close popup when click occurs outside of it
  document.querySelector('.jqmOverlay').addEventListener('click', () => {
    popupNavLinks.forEach( popupNavLink => {
      popupNavLink.classList.remove('visible');
    });
    togglePopup();
  });
}  

// display all list elements in the list
function showListElements(listItem) {
  var siblings = [...listItem.parentElement.children];
  siblings.forEach(li => {
    li.classList.add('visible');
  });
}

/**
 * Display submenu on click event
 * @param {string} itemLv1 : list element - from event listener
 */
function toggleMenu(itemLv1) {
  var itemsLv2 = Array.from(itemLv1.target.children);
  // second level of menu
  itemsLv2.forEach(itemLv2 => {
    itemLv2.classList.toggle('visible');
  });
}

// Display content from url in popup content bloc  
async function displayMessage(url) {
  var target = document.querySelector('.popup-content');
  target.innerHTML = '';
  try {
    var text = await fetchMessage(url);
    target.appendChild(text);
  } catch {
    var error = document.createElement('p');
    error.className = 'error';
    error.textContent = 'Oups! Il semblerait que les infos soient parties faire un tour... Tu peux les retrouver dans Vie du Forum. Bisous';
    target.appendChild(error);
  }
}

// Fetch post html content and add it to popup
async function fetchMessage(url) {
  let response = await fetch(url);
  let html = await response.text();
  
  // Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

  // Get the message content
  var idMsg = url.split('#')[1];
  var text = doc.querySelector('#msg-'+ idMsg +' .post-popup');
 
  return text;
}

function togglePopup() {
  document.querySelector('.popup').classList.toggle('flex');
  document.querySelector('.jqmOverlay').classList.toggle('visible');
}



// Display Popup
/*
- selectionner les liens onglet
- poser un écouteur click
- afficher la popup et le overlay

- écouteur sur la croix 
- fermer popup et masquer overlay
*/