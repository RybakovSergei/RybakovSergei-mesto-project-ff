
// index.js

// import 'regenerator-runtime/runtime';

import '../pages/index.css'; 
import {initialCards} from '../components/cards.js';

import logoImage from '../images/logo.svg';
import avatarImage from '../images/avatar.jpg';

const defaultCards = [
  { name: 'Логотип', link: logoImage },
  { name: 'Аватар', link: avatarImage },
];

const logo = document.querySelector('.logo');
logo.src = logoImage;

const avatar = document.querySelector('.profile__image');
avatar.src = avatarImage;


    // Функция для создания элемента карточки
    function createCardElement(cardData, deleteCallback) {
      const cardTemplate = document.querySelector('#card-template').content;
      const cardElement = cardTemplate.cloneNode(true).querySelector('.places__item');

      const cardImage = cardElement.querySelector('.card__image');
      const cardTitle = cardElement.querySelector('.card__title');
      const likeButton = cardElement.querySelector('.card__like-button');
      const deleteButton = cardElement.querySelector('.card__delete-button');

      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      cardTitle.textContent = cardData.name;

      // Добавляем обработчик события клика на изображение
      cardImage.addEventListener('click', function() {
        openImagePopup(cardData);
      });

      deleteButton.addEventListener('click', () => deleteCallback(cardElement));
      return cardElement;
    }

    // Функция для удаления карточки
    function deleteCard(cardElement) {
      cardElement.remove();
    }

    // Отобразим все карточки на странице
    function renderCards() {
      const placesList = document.querySelector('.places__list');

      initialCards.forEach(cardData => {
        const cardElement = createCardElement(cardData, deleteCard);
        placesList.appendChild(cardElement);
      });
    }

    //функция для отображения карточек при загрузке страницы
    renderCards();

// Найдем форму для нового места и сделаем обработчик события
const newPlaceForm = document.forms['new-place'];

newPlaceForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Получим значения из полей формы
  const placeNameInput = this.elements['place-name'];
  const linkInput = this.elements['link'];

    const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value
  };

  // Создаем элемент карточки и добавляем его на страницу
  const newCardElement = createCardElement(newCardData, deleteCard);
  const placesList = document.querySelector('.places__list');
  placesList.appendChild(newCardElement);

  // Очищаем поля формы
  this.reset();
});

// Сделаем кнопку "Добавить место"
const addButton = document.querySelector('.profile__add-button');
const newPlacePopup = document.querySelector('.popup_type_new-card');
function openNewPlacePopup() {
  newPlacePopup.classList.add('popup_is-opened');
  openPopup(newPlacePopup);
}

addButton.addEventListener('click', openNewPlacePopup);

// Кнопка закрытия меню добавления карточек
const closeButton = document.querySelector('.popup_type_new-card .popup__close');
// Меню добавления карточек
const newCardPopup = document.querySelector('.popup_type_new-card');
// Функция для закрытия меню добавления карточек
function closeNewCardPopup() {
  newCardPopup.classList.remove('popup_is-opened');
}
// Закрытие меню добавления карточек
closeButton.addEventListener('click', closeNewCardPopup);

// Добавим обработчик события клика на каждую кнопку лайка
const likeButtons = document.querySelectorAll('.card__like-button');

likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', function() {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      likeButton.classList.remove('card__like-button_is-active');
    } else {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
});

function openImagePopup(cardData) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  imagePopup.classList.add('popup_is-opened');
}

// Добавим обработчик события клика на кнопку закрытия popup
const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');
imagePopupCloseButton.addEventListener('click', closeImagePopup);
function closeImagePopup() {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.classList.remove('popup_is-opened');
}



//кнопка "Редактировать профиль"
const editButton = document.querySelector('.profile__edit-button');

function openEditProfilePopup() {
  const editProfilePopup = document.querySelector('.popup_type_edit');
  editProfilePopup.classList.add('popup_is-opened');
}

editButton.addEventListener('click', openEditProfilePopup);



// Функция для закрытия модального окна редактирования профиля
function closeEditProfilePopup() {
  const editProfilePopup = document.querySelector('.popup_type_edit');
  editProfilePopup.classList.remove('popup_is-opened');
}

// Найдем кнопку закрытия модального окна редактирования профиля
const editProfileCloseButton = document.querySelector('.popup_type_edit .popup__close');

// Добавим обработчик события для кнопки закрытия модального окна редактирования профиля
editProfileCloseButton.addEventListener('click', closeEditProfilePopup);

// Найдем все модальные окна на странице
const popups = document.querySelectorAll('.popup');

// Добавим обработчик события клика для каждого модального окна
popups.forEach(popup => {
  popup.addEventListener('click', function(event) {
    // Если клик произошел на оверлее (без модального контента)
    if (event.target === popup) {
      popup.classList.remove('popup_is-opened'); // Закрыть модальное окно
    }
  });
});












// Функция для закрытия модального окна при нажатии на Esc
function closeOnEsc(event) {
  console.log('closeOnEsc is called'); // добавляем отладочный вывод
  if (event.key === 'Escape') {
    console.log('Escape key pressed'); // добавляем отладочный вывод
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция для открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc); // Добавляем обработчик события для закрытия по Esc
  console.log('keydown event listener added'); // добавляем отладочный вывод
}

// Функция для закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEsc); // Удаляем обработчик события для закрытия по Esc
}

// Найдем все кнопки открытия модальных окон
const openPopupButtons = document.querySelectorAll('.open-popup-button');

// Добавим обработчик события клика для каждой кнопки
openPopupButtons.forEach(button => {
  button.addEventListener('click', function() {
    const popupId = this.dataset.popupId;
    const popup = document.getElementById(popupId);
    openPopup(popup);
  });
});

// Найдем все кнопки закрытия модальных окон
const closePopupButtons = document.querySelectorAll('.popup__close');

// Добавим обработчик события клика для каждой кнопки
closePopupButtons.forEach(button => {
  button.addEventListener('click', function() {
    const popup = this.closest('.popup');
    closePopup(popup);
  });
});




