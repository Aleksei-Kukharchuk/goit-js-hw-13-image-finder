import './css/style.css';
import ImgApiService from './js/api-service';
import imageCard from './templates/image-card.hbs';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { info, Stack, success, error} from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const refs = {
  searchForm: document.querySelector('.search-form'),
  imagesContainer: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
};

const imgApiService = new ImgApiService();

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  push: 'top',
  maxStrategy: 'close',
  maxOpen: 1,
  maxClosureCausesWait: false
});

refs.imagesContainer.addEventListener('click', onImgClick)
refs.searchForm.addEventListener('submit', onSearch);

function onImgClick(evt) {
  evt.preventDefault();
    if (evt.target.nodeName !== 'IMG')
  {return
  }
  const src = evt.target.dataset.src;
  const instance = basicLightbox.create(`<img src="${src}" width="800" height="600">`);
  instance.show()

  info({
    title: 'Help',
    text: 'Tap anywhere to close',
    hide: true,
    delay: 2000,
    stack: myStack
  });
};
 
function onSearch(e) {
  e.preventDefault();
  imgApiService.query = e.currentTarget.elements.query.value;
  if (imgApiService.query != '') {
    imgApiService.resetPage();
    clearImagesContainer();
    fetchImages();
  };
}

function fetchImages() {
  imgApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    console.log(images);
    if (images.length > 0) {
      success({
        title: 'Success!',
        text: `Load ${images.length} images!`,
        hide: true,
        delay: 2000,
        stack: myStack
      });
    } else { 
      error({
        title: 'Ups!',
        text: `No more images!`,
        hide: true,
        delay: 2000,
        stack: myStack
      });
    }
  });
  }

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imageCard(images));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

const onEntry = entries => { 
  entries.forEach(entry => { 
    if (entry.isIntersecting && imgApiService.query != '') { 
      fetchImages()
    }
  })
}
const options = {
  rootMargin: '200px'
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);