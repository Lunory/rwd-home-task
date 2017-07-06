var page = document.querySelector('.page');
var item = document.querySelectorAll('.gallery__item');
var popup = document.querySelector('.popup');

var openItem = function () {
  event.preventDefault();
  var image = this.querySelector('.gallery__item-img');
  page.style.overflow = 'hidden';
  popup.classList.toggle('popup--open');
  popup.querySelector('.popup__wrap').innerHTML += image.outerHTML;

  popup.addEventListener('click', function () {
    event.preventDefault();
    page.style.overflow = 'auto';
    popup.querySelector('.gallery__item-img').remove();
    popup.classList.toggle('popup--open');
  })
};

if (item) {
  for (var i = 0; i < item.length; i++) {
    item[i].addEventListener('click', openItem)
  }
}
