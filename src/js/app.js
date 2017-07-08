var page = document.querySelector('.page');
var item = document.querySelectorAll('.gallery__item');
var popup = document.querySelector('.popup');

var closeItem = function (event) {
  event.preventDefault();
  page.style.overflow = 'auto';
  var imgPopup = popup.querySelector('.gallery__item-img');
  imgPopup.parentNode.removeChild(imgPopup);
  popup.classList.toggle('popup--open');
};

var openItem = function (event) {
  event.preventDefault();
  var image = this.querySelector('.gallery__item-img');
  page.style.overflow = 'hidden';
  popup.classList.toggle('popup--open');
  popup.querySelector('.popup__wrap').innerHTML += image.outerHTML;
  popup.addEventListener('click', closeItem);
};

if (item) {
  for (var i = 0; i < item.length; i++) {
    item[i].addEventListener('click', openItem)
  }
}

objectFitImages();