// modal.js

function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
  }
  
  function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
  }
  
  // Функция для открытия модального окна
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc); // Добавляем обработчик события для закрытия по Esc

  }
  
  // Функция для закрытия модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc); // Удаляем обработчик события для закрытия по Esc
  }

  // Функция для закрытия модального окна при нажатии на Esc
function closeOnEsc(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

  // Добавим обработчик события клика для каждого модального окна
function closePopupsOnClick(event){
    popups.forEach(popup => {
        popup.addEventListener('click', function(event) {
          // Если клик произошел на оверлее (без модального контента)
          if (event.target === popup) {
            popup.classList.remove('popup_is-opened'); // Закрыть модальное окно
          }
        });
      });
}  

  export { openModal, closeModal, openPopup, closePopup, closeOnEsc, closePopupsOnClick };