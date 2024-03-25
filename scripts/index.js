// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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

  // Получаем значения из полей формы
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
// Найдем соответствующий popup
const newPlacePopup = document.querySelector('.popup_type_new-card');
// Функция для popup
function openNewPlacePopup() {
  newPlacePopup.classList.add('popup_is-opened');
}
// Обработчик события "Добавить место"
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



// Найдем кнопку лайка на странице
const likeButtons = document.querySelectorAll('.card__like-button');

// Добавим обработчик события клика на каждую кнопку лайка
likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', function() {
    // Проверяем, есть ли у кнопки класс "card__like-button_is-active"
    if (likeButton.classList.contains('card__like-button_is-active')) {
      // Если класс есть, то удаляем его
      likeButton.classList.remove('card__like-button_is-active');
    } else {
      // Если класса нет, то добавляем его
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
  popupCaption.textContent = cardData.name; // Предполагается, что у вас есть поле description в объекте cardData

  imagePopup.classList.add('popup_is-opened');
}











// Найдем кнопку закрытия popup с изображением
const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');

// Добавим обработчик события клика на кнопку закрытия popup
imagePopupCloseButton.addEventListener('click', closeImagePopup);

// Функция для закрытия popup с изображением
function closeImagePopup() {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.classList.remove('popup_is-opened');
}


























