
import '../pages/index.css'; 
import {initialCards} from '../components/cards.js';
import Modal from '@components/modal.js';
import { openModal, closeModal, openPopup, closePopup, closeOnEsc, closePopupsOnClick} from './modal.js';

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

      likeButton.addEventListener('click', function() {
        toggleLike(likeButton); // Функция, которая меняет состояние кнопки лайка
      });

      function toggleLike(likeButton) {
        likeButton.classList.toggle('card__like-button_is-active');
      }

      likeButton.addEventListener('click', function() {
        toggleLike(this);
      });
      
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
  placesList.insertBefore(newCardElement, placesList.firstChild);

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

// Функция для закрытия модального окна добавления новой карточки
function closeNewPlacePopup() {
  newPlacePopup.classList.remove('popup_is-opened');
}

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

  // Устанавливаем значение "Жак-ив кусто" в поля "Имя" и "О себе"
  nameInput.value = "Жак-ив кусто";
  aboutInput.value = "Исследователь океана";

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

// Функция для закрытия модального окна редактирования профиля при нажатии на Esc
function closeEditProfileOnEsc(event) {
  if (event.key === 'Escape') {
    const editProfilePopup = document.querySelector('.popup_type_edit.popup_is-opened');
    if (editProfilePopup) {
      closeEditProfilePopup();
    }
  }
}

// Добавляем обработчик события для закрытия модального окна редактирования профиля при нажатии на Esc
document.addEventListener('keydown', closeEditProfileOnEsc);

// Функция для закрытия модального окна изображения при нажатии на Esc
function closeImagePopupOnEsc(event) {
  if (event.key === 'Escape') {
    const imagePopup = document.querySelector('.popup_type_image.popup_is-opened');
    if (imagePopup) {
      closeImagePopup();
    }
  }
}

// Добавляем обработчик события для закрытия модального окна изображения при нажатии на Esc
document.addEventListener('keydown', closeImagePopupOnEsc);

// Получаем элементы полей "Имя" и "О себе" и сохраняем их в переменные
const editProfilePopup = document.querySelector('.popup_type_edit');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const aboutInput = editProfilePopup.querySelector('.popup__input_type_description');

// Устанавливаем значение "Жак-ив кусто" в поля "Имя" и "О себе"
nameInput.value = "Жак-ив кусто";
aboutInput.value = "Исследователь океана";

// Находим форму в DOM
const editProfileForm = document.querySelector('.popup_type_edit form');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем значения полей nameInput и aboutInput из свойства value
    const newName = nameInput.value;
    const newAbout = aboutInput.value;

    // Выбираем элементы, куда должны быть вставлены новые значения
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставляем новые значения с помощью textContent
    profileName.textContent = newName;
    profileDescription.textContent = newAbout;

    // Закрываем попап после сохранения
    closeEditProfilePopup();
}

// Прикрепляем обработчик к форме
editProfileForm.addEventListener('submit', handleFormSubmit);

closePopupButtons.forEach(button => {
  button.addEventListener('click', function() {
    const popup = this.closest('.popup');
    closeModal(popup);
  });
});