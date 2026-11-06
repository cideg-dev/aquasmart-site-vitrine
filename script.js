(() => {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const langButton = document.querySelector('.lang-switch');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const contact = {
    email: '',
    phone: ''
  };
  let language = document.documentElement.lang === 'en' ? 'en' : 'fr';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
      element.innerHTML = element.getAttribute(`data-${next}`);
    });
    document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach(element => {
      element.placeholder = element.getAttribute(`data-placeholder-${next}`);
    });
    langButton.textContent = next === 'fr' ? 'EN' : 'FR';
    langButton.setAttribute('aria-label', next === 'fr' ? 'Passer en anglais' : 'Switch to French');
    toggle.setAttribute('aria-label', next === 'fr' ? 'Ouvrir le menu' : 'Open menu');
    document.title = next === 'fr'
      ? 'AquaSmart Control SARL | Gestion intelligente de l’eau'
      : 'AquaSmart Control SARL | Smart water management';
    document.querySelector('meta[name="description"]').content = next === 'fr'
      ? 'AquaSmart Control SARL développe des solutions intelligentes pour mieux suivre, contrôler et optimiser la consommation d’eau.'
      : 'AquaSmart Control SARL is developing smart solutions to help households and organisations monitor, control and optimise their water use.';
  }

  function setContactMethod(elementId, value, href) {
    const container = document.getElementById(elementId);
    if (!value) return false;

    const link = container.querySelector('a');
    link.href = href;
    link.textContent = value;
    container.hidden = false;
    return true;
  }

  const companyEmail = contact.email.trim();
  const companyPhone = contact.phone.trim();
  const hasEmail = setContactMethod('company-email', companyEmail, `mailto:${companyEmail}`);
  const hasPhone = setContactMethod(
    'company-phone',
    companyPhone,
    `tel:${companyPhone.replace(/[^\d+]/g, '')}`
  );
  document.getElementById('contact-pending').hidden = hasEmail || hasPhone;

  langButton.addEventListener('click', () => setLanguage(language === 'fr' ? 'en' : 'fr'));
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!companyEmail) {
      formStatus.textContent = language === 'fr'
        ? 'Le formulaire est prêt ; une adresse e-mail professionnelle doit être configurée avant son utilisation.'
        : 'The form is ready; a business email address must be configured before it can be used.';
      return;
    }

    const data = new FormData(contactForm);
    const subject = encodeURIComponent(language === 'fr'
      ? 'Contact depuis le site AquaSmart Control'
      : 'Contact from the AquaSmart Control website');
    const body = encodeURIComponent(
      `Nom / Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    );
    formStatus.textContent = language === 'fr'
      ? 'Votre application de messagerie va s’ouvrir.'
      : 'Your email application will open.';
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  setLanguage(language);
})();
