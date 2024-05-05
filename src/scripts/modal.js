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
    console.log('keydown event listener added'); // добавляем отладочный вывод
  }
  
  // Функция для закрытия модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc); // Удаляем обработчик события для закрытия по Esc
  }

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

  export { openModal, closeModal, openPopup, closePopup, closeOnEsc };