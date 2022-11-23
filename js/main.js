var $pagecontainer = document.querySelector('.page-container');

var $page = document.querySelectorAll('.page');
var $view = document.querySelectorAll('.view');

$pagecontainer.addEventListener('click', pageView);

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
