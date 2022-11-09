import './contactCard.css';

const contactCardForEach = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const contactCard = document.querySelectorAll('.contact-card');
  if (params.id) {
    contactCard.forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.id === params.id) {
        item.classList.add('active');
      }
    });
  }
}

const contactCard = () => {
  contactCardForEach();
  window.addEventListener("locationchange", contactCardForEach);
}

export { contactCard };
