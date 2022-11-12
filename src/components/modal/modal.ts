export const openModal = () => {
  const modal = document.getElementById('myModal');
  const btnAddUser = document.getElementById('openModalAddUser');
  const btnDelUser = document.getElementById('openModalDelUser');
  const btnUploadAvatar = document.getElementById('openModalUploadAvatar');

  if (btnAddUser && modal) {
    btnAddUser.onclick = function () {
      modal.style.display = 'flex';
      const modalH3 = modal.querySelector('h3');
      if (modalH3) {
        modalH3.textContent = 'Добавить пользователя';
      }
      const modalForm = modal.querySelector('input[type=submit]') as HTMLInputElement;
      if (modalForm) {
        modalForm.value = 'Добавить';
      }
    };
  }

  if (btnDelUser && modal) {
    btnDelUser.onclick = function () {
      modal.style.display = 'flex';
      const modalH3 = modal.querySelector('h3');
      if (modalH3) {
        modalH3.textContent = 'Удалить пользователя';
      }
      const modalForm = modal.querySelector('input[type=submit]') as HTMLInputElement;
      if (modalForm) {
        modalForm.value = 'Удалить';
      }
    };
  }

  if (btnUploadAvatar && modal) {
    btnUploadAvatar.onclick = function () {
      modal.style.display = 'flex';

      const modalH3 = modal.querySelector('h3');
      if (modalH3) {
        modalH3.textContent = 'Загрузить файл';
      }

      const modalForm = modal.querySelector('input[type=login]') as HTMLInputElement;
      if (modalForm) {
        modalForm.setAttribute('type', 'file');
      }

      const modalLabel = modal.querySelector('label span');
      if (modalLabel) {
        modalLabel.textContent = 'Выбрать файл на компьютере';
      }

      const modalLabelSpan = modal.querySelector('label span');
      if (modalLabelSpan) {
        modalLabelSpan.classList.add('file');
      }
      const modalFormSubmit = modal.querySelector('input[type=submit]') as HTMLInputElement;
      if (modalFormSubmit) {
        modalFormSubmit.value = 'Поменять';
      }
    };
  }

  window.addEventListener('click', function (event) {
    if (modal && event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

