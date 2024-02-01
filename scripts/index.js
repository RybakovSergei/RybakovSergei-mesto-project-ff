// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



    // Ваша функция для создания элемента карточки
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

      likeButton.addEventListener('click', () => toggleLike(likeButton));
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

    // Вызываем функцию для отображения карточек при загрузке страницы
    renderCards();