var $pagecontainer = document.querySelector('.page-container');

var $page = document.querySelectorAll('.page');
var $view = document.querySelectorAll('.view');
var $button = document.querySelector('button');
var $ul = document.querySelector('#artist-work');

$pagecontainer.addEventListener('click', pageView);
$button.addEventListener('click', pageView);
// function for viewswapping
function pageView(event) {
  if (!event.target.matches('.page')) {
    return;
  }
  for (var i = 0; i < $page.length; i++) {
    if ($page[i] === event.target) {
      $page[i].className = 'page active';
    } else {
      $page[i].className = 'page';
    }
  }
  var dataView = event.target.getAttribute('data-view');
  for (var j = 0; j < $view.length; j++) {
    if ($view[j].getAttribute('data-view') === dataView) {
      $view[j].className = 'view';
    } else {
      $view[j].className = 'view hidden';
    }
  }
}
// Handle Submit button
var $artistSearch = document.querySelector('#artist-search');

$artistSearch.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  data.searchResult = [];
  var artistSearch = $artistSearch.elements.search.value;
  var template = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true';
  var request = `${template}` + '&q=' + `${artistSearch}`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', request);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.objectIDs.length > 10) {
      for (var i = 0; i < 10; i++) {
        storeResults(xhr.response.objectIDs[i]);
      }
      // renderSearchResult();
      setTimeout(renderSearchResult, 1000);
    } else {
      for (var j = 0; j < xhr.response.objectIDs.length; j++) {
        storeResults(xhr.response.objectIDs[j]);
      }
      renderSearchResult();
    }
  });
  xhr.send();
}

function storeResults(objectID) {
  var template = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
  var request = `${template}${objectID}`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', request);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.searchResult.push(xhr.response);
  });
  xhr.send();
}

// DOM Tree

function renderArt(artObject) {
  var $list = document.createElement('li');

  $list.setAttribute('data-entry-id', artObject.objectID);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');

  $list.appendChild($divRow);

  var $divColFull = document.createElement('div');
  $divColFull.setAttribute('class', 'column-full');

  $divRow.appendChild($divColFull);

  var $img = document.createElement('img');
  $img.setAttribute('src', artObject.primaryImageSmall);

  $divColFull.appendChild($img);

  var $divArtWork = document.createElement('div');
  $divArtWork.setAttribute('class', 'artwork-name');
  $divArtWork.textContent = artObject.title;
  $divColFull.appendChild($divArtWork);

  var $divArtist = document.createElement('div');
  $divArtist.setAttribute('class', 'artist-name');
  $divArtist.textContent = artObject.artistDisplayName;
  $divColFull.appendChild($divArtist);

  return $list;
}
// var $ul = document.querySelector('#artist-work');
function renderSearchResult() {
  for (var i = 0; i < data.searchResult.length; i++) {
    $ul.appendChild(renderArt(data.searchResult[i]));
  }
}
