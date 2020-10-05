function openMenu(menu) {
  document.getElementById(menu).style.height = "auto";
  document.getElementById(menu).style.opacity = "1";
}

function closeMenu(menu) {
  document.getElementById(menu).style.height = "0";
  document.getElementById(menu).style.opacity = "0";
}

/* petit système d'onglet dans le QEEL */
function changeGroupInfo(info) {
   document.querySelector('.viewonline-groups-info').innerHTML = info;
 }

$(function() {
    $('img.emojione').each(function() {
      $(this).after( $(this).attr('alt') ).remove();
    });
});

$(function(){
  $(".sceditor-button-emoticon").click(function(){
     $(".smiley").unbind("hover");
  });
});;

function switchOnglet () {
  $('#cat_NM .forumrows').before('<nav class="nav-onglets"><a href="#general" class="onglets-link">Général</a><a href="#nm-MM" class="onglets-link">Pico. Monde</a><a href="#nm-AP" class="onglets-link">Alpha Perdu</a><a href="#nm-zombie" class="onglets-link">Zombieland</a><a href="#nm-AdP" class="onglets-link">Aventures du passé</a><a href="#nm-xmen" class="onglets-link">X-men</a><a href="#nm-chimeres" class="onglets-link">Chimères</a></nav>');

  document.querySelectorAll('.onglets-link').forEach(link => {
    link.addEventListener("click", function(e) { 
      e.preventDefault();

      document.querySelectorAll('.onglets').forEach(onglet => {    
        if ( $(onglet).hasClass('visible') ) {
          $(onglet).removeClass('visible');
        }
      });
      
      var NM = $(e.target).attr('href');
      document.querySelector(NM).classList.add('visible');
    });
  });
};
    
/* ajoute une bordure dans les messages RP si hors limite de longueur */
   function addBorderOnTooLongMsg() {
    var allPostBody = document.querySelectorAll('#cat_NM .post-body-content');
    // execute function only in category RP
    if (typeof allPostBody !== 'undefined') {

       allPostBody.forEach(postBody => {
       // create and add counter element
        var totalChar = postBody.textContent.length;
        var indic = document.createElement('div');
        indic.className = 'indic';
        indic.textContent = "Total caractères : " + totalChar;
        postBody.appendChild(indic);

        
        // specify differents limits for only first post in topic
        if (postBody === allPostBody[0]) {
          var contractRP = postBody.querySelector('.post-block-ink-2') ? postBody.querySelector('.post-block-ink-2') : postBody.querySelector('dt');
          var spoiler = postBody.querySelector('.spoiler');
          var postMessageLength = postBody.querySelector('.post-body-content-message').innerText.length;
          var firstMsgLength = spoiler ? postMessageLength - contractRP.innerText.length - spoiler.innerText.length : postMessageLength - contractRP.innerText.length;

          if (firstMsgLength > 0 && firstMsgLength <= 1444) {
            postBody.style.border = 'none';
          } else {
            postBody.style.border = '3px solid #ee1c25';
          }
        } 
        else {
          // add border when limit's over
          var spoiler = postBody.querySelector('.spoiler');
          var postMessageLength = postBody.querySelector('.post-body-content-message').innerText.length;
          var newTotalChar = spoiler ? postMessageLength - spoiler.textContent.length : postMessageLength;

         if (newTotalChar > 0 && newTotalChar < 482) {
            postBody.style.border = 'none';
          } else if (newTotalChar >= 482 && newTotalChar <= 690) {
            postBody.style.border = '3px solid #a963a9';
          } else {
            postBody.style.border = '3px solid #ee1c25';
          }   
        }
      });

    };
 };
    
/* pour avoir des tailles différentes aux étiquettes dans topics list*/
function appendIconImg() {
  var etiqs = document.querySelectorAll('.topic-etiquette');
  
  etiqs.forEach( etiq => {
    var imgURL = etiq.style.backgroundImage.split('"')[1];
    var etiqType = imgURL.split('/')[8];
    
    if (etiqType === 'an_no.jpg' 
    || etiqType === 'an_note.jpg' 
    || etiqType === 'an_glob.jpg') {
      var img = document.createElement('img');
      img.setAttribute('src', imgURL);
      img.setAttribute('alt', 'étiquette');
      etiq.appendChild(img);
    }
  })
};


/* correctif pour le nombre de message RP (qui inclus les cookies) */    
function fixTotalMsgRPinProfile() {
  var profiles = document.querySelectorAll('.post-profile-fields');
  profiles.forEach( profile => {
    var totalCookies = profile.childNodes[1].innerText;
    var totalMsgRP = profile.childNodes[4];
    var newTotalMsgRP = totalMsgRP.innerText - totalCookies;
    totalMsgRP.innerText = newTotalMsgRP;
  });
}

/* force style to /post page like confirm posting */
function addWrapperStyleOnPost() {
  const url = window.location.href.split('/')[3];
  if (url === 'post') {
   document.getElementById('main-content').className = 'wrapper solo';
   document.querySelector('.postbody').style.backgroundColor = '#f4f4f4';
   document.querySelectorAll('.inner')[1].style.backgroundColor = 'white';
  }
};