import './contactCard.css';

const contactCardForEach = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(String(prop)),
  }) as URLSearchParams & { [key: string]: string };
  const contactCard = document.querySelectorAll('.contact-card') as NodeListOf<HTMLElement>;
  console.log('params', params.id);
  if (params.id) {
    contactCard.forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.id === params.id) {
        item.classList.add('active');
      }
    });
  }
};

const contactCard = () => {
  contactCardForEach();
  window.addEventListener('locationchange', contactCardForEach);
};

export { contactCard };
