function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
};

function randomBgImage(target, images) {
  for (let i = 0; i < target.length; i++) {
    target[i].style.backgroundImage = 'url(' + images[i] + ')';
  }
};

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
};

// display all list elements in the list
function showListElements(listItem) {
  var siblings = [...listItem.parentElement.children];
  siblings.forEach(li => {
    li.classList.add('visible');
  });
};

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
};

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
};

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
};

function togglePopup() {
  document.querySelector('.popup').classList.toggle('flex');
  document.querySelector('.jqmOverlay').classList.toggle('visible');
  document.body.classList.toggle('modal-opened');
};
    
/* QUI EST EN LIGNE - TEXTE */    
function changeViewonlineText() {
	var TU = document.getElementById('TU');
	TU.innerHTML = TU.innerHTML.replace(/Nous avons /," ").replace(/ membres enregistrés/," nanites");
	// TOTAL MEMBRES MOINS LES SOUVENIRS
	var totalSouvenirs = 68;
	var totalMembers = TU.children[0].innerText;
	TU.children[0].innerText = totalMembers - totalSouvenirs;	
		
	document.getElementById('TP').innerHTML = document.getElementById('TP').innerHTML.replace(/Nos membres ont posté un total de /,"");
		
	document.getElementById('NU').innerHTML = document.getElementById('NU').innerHTML.replace(/L'utilisateur enregistré le plus récent est/,"Le dernier gus s'appelle ");
		
	document.getElementById('TUO').innerHTML = document.getElementById('TUO').innerHTML.replace(/Il y a en tout/,"").replace(/utilisateur en ligne ::/," en ligne").replace(/utilisateurs en ligne ::/," en ligne").replace(/Enregistré/,"").replace(/Enregistrés/,"").replace(/Invisible/,"").replace(/Invisibles /,"").replace(/Invité/,"voyeur").replace(/Invités/,"voyeurs");
		
	var arrTUO = document.getElementById('TUO').innerHTML.split(" ");
	var strTUO = '<span>' + arrTUO[5] + ' connecté(s)</span><span>' + arrTUO[10] + ' voyeur(s)</span>';
	document.getElementById('TUO').innerHTML = strTUO;
		
	document.getElementById('LIUL').innerHTML = document.getElementById('LIUL').innerHTML.replace(/Utilisateurs enregistrés :/," ").replace(/<br>/gi,'');
		
	document.getElementById('connected').innerHTML = document.getElementById('connected').innerHTML.replace(/Membres connectés au cours des 48 dernières heures :/," ");
		 
	document.getElementById('annif').innerHTML = document.getElementById('annif').innerHTML.replace(/Membres fêtant leur anniversaire aujourd'hui :/,"Joyeux Anniversaire ").replace(/Aucun membre ne fête son anniversaire aujourd'hui/, "Pas de naniversaire");
};