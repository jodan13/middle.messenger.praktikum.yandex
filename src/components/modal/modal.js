export const openModal = () => {
  const modal = document.getElementById("myModal");
  const btnAddUser = document.getElementById("openModalAddUser");
  const btnDelUser = document.getElementById("openModalDelUser");
  const btnUploadAvatar = document.getElementById("openModalUploadAvatar");

  if (btnAddUser) {
    btnAddUser.onclick = function () {
      modal.style.display = "flex";
      modal.querySelector("h3").textContent = "Добавить пользователя";
      modal.querySelector("input[type=submit]").value = "Добавить";
    }
  }

  if (btnDelUser) {
    btnDelUser.onclick = function () {
      modal.style.display = "flex";
      modal.querySelector("h3").textContent = "Удалить пользователя";
      modal.querySelector("input[type=submit]").value = "Удалить";
    }
  }

  if (btnUploadAvatar) {
    btnUploadAvatar.onclick = function () {
      modal.style.display = "flex";
      modal.querySelector("h3").textContent = "Загрузить файл";
      modal.querySelector("input[name=login]").setAttribute('type', 'file');
      modal.querySelector("label span").textContent = "Выбрать файл на компьютере";
      modal.querySelector("label span").classList.add('file')
      modal.querySelector("input[type=submit]").value = "Поменять";
    }
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

