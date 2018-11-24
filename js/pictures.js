'use strict';

var COMMENT_EXAMPLES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION_EXAMPLES = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var USERS_AMOUNT = 25;

var userPhotoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
var picturesSectionEl = document.querySelector('.pictures');
var bigPictureEl = document.querySelector('.big-picture');

var fragment = document.createDocumentFragment();

var usersPhotosData = createUsersPhotosData(USERS_AMOUNT);
var userPicturesEls = createUsersPicturesEls(usersPhotosData, fragment, userPhotoTemplateEl);

renderElements(picturesSectionEl, userPicturesEls);

showElement(bigPictureEl);

bigPictureEl.querySelector('.big-picture__img img').src = usersPhotosData[0].url;
bigPictureEl.querySelector('.likes-count').textContent = usersPhotosData[0].likes;
bigPictureEl.querySelector('.comments-count').textContent = usersPhotosData[0].comments.length;
bigPictureEl.querySelector('.social__caption').textContent = usersPhotosData[0].description;
bigPictureEl.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureEl.querySelector('.comments-loader').classList.add('visually-hidden');

bigPictureEl.querySelector('.social__comments').innerHTML = '';

for (var i = 0; i < usersPhotosData[0].comments.length; i++) {
  var commentText = usersPhotosData[0].comments[i];

  var commentEl = createCommentItemEl(commentText);

  fragment.appendChild(commentEl);
}

bigPictureEl.querySelector('.social__comments').appendChild(fragment);

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getRandomComments(arr) {
  var commentsAmount = getRandomInteger(0, 1);

  var comments = [];

  for (i = 0; i <= commentsAmount; i++) {
    comments.push(arr[getRandomInteger(0, arr.length - 1)]);
  }

  return comments;
}

function createCommentItemEl(text) {
  var commentItemEl = document.createElement('li');
  var commentItemImgEl = document.createElement('img');
  var commentItemParaEl = document.createElement('p');

  commentItemEl.classList.add('social__comment');
  commentItemImgEl.classList.add('social__picture');
  commentItemParaEl.classList.add('social__text');

  commentItemImgEl.src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
  commentItemParaEl.textContent = text;

  commentItemEl.appendChild(commentItemImgEl);
  commentItemEl.appendChild(commentItemParaEl);

  return commentItemEl;
}

function createUsersPhotosData(amount) {
  var photosData = [];

  for (i = 1; i <= amount; i++) {
    var userPhotoData = {};

    userPhotoData.url = 'photos/' + i + '.jpg';
    userPhotoData.likes = getRandomInteger(15, 200);
    userPhotoData.comments = getRandomComments(COMMENT_EXAMPLES);
    userPhotoData.description = DESCRIPTION_EXAMPLES[getRandomInteger(0, DESCRIPTION_EXAMPLES.length - 1)];

    photosData.push(userPhotoData);
  }

  return photosData;
}

function createUsersPicturesEls(usersDataArr, fragmentEl, templateEl) {
  for (i = 0; i < usersDataArr.length; i++) {
    var userData = usersDataArr[i];
    var userPhotoEl = templateEl.cloneNode(true);

    userPhotoEl.querySelector('.picture__img').src = userData.url;
    userPhotoEl.querySelector('.picture__likes').textContent = userData.likes;
    userPhotoEl.querySelector('.picture__comments').textContent = userData.comments.length;

    fragmentEl.appendChild(userPhotoEl);
  }

  return fragmentEl;
}

function renderElements(parent, elements) {
  parent.appendChild(elements);
}

function showElement(element) {
  element.classList.remove('hidden');
}
