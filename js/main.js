var $pagecontainer = document.querySelector('.page-container');

var $page = document.querySelectorAll('.page');
var $view = document.querySelectorAll('.view');
var $button = document.querySelector('button');

$pagecontainer.addEventListener('click', pageView);
$button.addEventListener('click', pageView);
// function for viewswapping
function pageView(event) {
  console.log('hi');
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

// function for ajax
function getMetData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/objects/437133');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

getMetData();
