export const dropdown = () => {
  const myDropdownButton = document.getElementById('myDropdownButton');
  if (myDropdownButton) {
    myDropdownButton.addEventListener('click', () => {
      const myDropdown = document.getElementById('myDropdown');
      if (myDropdown) {
        myDropdown.classList.toggle('show');
      }
    });
  }

  const myDropdownFileButton = document.getElementById('myDropdownFileButton');
  if (myDropdownFileButton) {
    myDropdownFileButton.addEventListener('click', () => {
      const myDropdownFile = document.getElementById('myDropdownFile');
      if (myDropdownFile) {
        myDropdownFile.classList.toggle('show');
      }
    });
  }

  window.addEventListener('click', function (event) {
    if (event.target instanceof Element && !event.target.closest('.menu-dots')) {
      const myDropdown = document.getElementById('myDropdown');
      if (myDropdown && myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
    if (event.target instanceof Element && !event.target.closest('.attach-file')) {
      const myDropdownFile = document.getElementById('myDropdownFile');
      if (myDropdownFile && myDropdownFile.classList.contains('show')) {
        myDropdownFile.classList.remove('show');
      }
    }
  });
};
