(() => {
  'use strict';

  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const langButton = document.querySelector('.lang-switch');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const STORAGE_KEY = 'aquasmart-lang';
  const MOBILE_BREAKPOINT = 700;
  const SWITCH_LABELS = {
    en: 'Switch to English',
    fr: 'Passer en français'
  };

  // Coordonnées publiques : à renseigner avant la mise en ligne.
  const contact = {
    email: 'aquasmartcontrole@gmail.com',
    phone: '+229 01 64 28 51 72'
  };

  const copy = {
    fr: {
      title: 'AquaSmart Control SARL | Gestion intelligente de l’eau',
      description: 'AquaSmart Control SARL développe des solutions intelligentes pour mieux suivre, contrôler et optimiser la consommation d’eau.',
      ogTitle: 'AquaSmart Control SARL | Gestion intelligente de l’eau',
      ogDescription: 'Des solutions intelligentes pour mieux suivre, contrôler et optimiser la consommation d’eau.',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      formReady: 'Le formulaire est prêt ; une adresse e-mail professionnelle doit être configurée avant son utilisation.',
      formOpening: 'Votre application de messagerie va s’ouvrir.',
      subject: 'Contact depuis le site AquaSmart Control',
      whatsappMessage: 'Bonjour AquaSmart Control, je souhaite en savoir plus sur votre solution de gestion de l’eau.'
    },
    en: {
      title: 'AquaSmart Control SARL | Smart water management',
      description: 'AquaSmart Control SARL is developing smart solutions to help households and organisations monitor, control and optimise their water use.',
      ogTitle: 'AquaSmart Control SARL | Smart water management',
      ogDescription: 'Smart solutions to help households and organisations monitor, control and optimise their water use.',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      formReady: 'The form is ready; a business email address must be configured before it can be used.',
      formOpening: 'Your email application will open.',
      subject: 'Contact from the AquaSmart Control website',
      whatsappMessage: 'Hello AquaSmart Control, I would like to know more about your water management solution.'
    }
  };

  function storedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function rememberLanguage(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      /* navigation privée : le choix ne sera pas mémorisé */
    }
  }

  // ?lang=fr|en > préférence enregistrée > français par défaut.
  // Le français reste la langue d'entrée : de nombreux navigateurs ouest-africains
  // sont configurés en anglais, un basculement automatique serait contre-productif.
  function initialLanguage() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'fr' || requested === 'en') return requested;

    const stored = storedLanguage();
    return stored === 'en' ? 'en' : 'fr';
  }

  function updateUrlLanguage(next) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(null, '', url);
    } catch (error) {
      /* file:// ou navigateur restrictif : on ignore */
    }
  }

  function updateMenuLabel(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? copy[language].closeMenu : copy[language].openMenu);
  }

  function setMenuOpen(isOpen) {
    nav.classList.toggle('open', isOpen);
    updateMenuLabel(isOpen);
  }

  let language = initialLanguage();

  function setLanguage(next, options = {}) {
    const { persist = true, updateUrl = true } = options;
    language = next;
    document.documentElement.lang = next;

    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
      element.innerHTML = element.getAttribute(`data-${next}`);
    });
    document.querySelectorAll('[data-alt-fr][data-alt-en]').forEach(element => {
      element.alt = element.getAttribute(`data-alt-${next}`);
    });
    document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach(element => {
      element.placeholder = element.getAttribute(`data-placeholder-${next}`);
    });

    const target = next === 'fr' ? 'en' : 'fr';
    langButton.textContent = target.toUpperCase();
    langButton.lang = target;
    langButton.setAttribute('aria-label', SWITCH_LABELS[target]);

    document.title = copy[next].title;
    if (metaDescription) metaDescription.content = copy[next].description;
    if (ogTitle) ogTitle.content = copy[next].ogTitle;
    if (ogDescription) ogDescription.content = copy[next].ogDescription;
    if (ogLocale) ogLocale.content = next === 'fr' ? 'fr_FR' : 'en_US';
    if (ogLocaleAlt) ogLocaleAlt.content = next === 'fr' ? 'en_US' : 'fr_FR';
    if (twitterTitle) twitterTitle.content = copy[next].ogTitle;
    if (twitterDescription) twitterDescription.content = copy[next].ogDescription;

    if (whatsappLink && whatsappNumber) {
      whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy[next].whatsappMessage)}`;
      whatsappLink.hidden = false;
    }

    updateMenuLabel(nav.classList.contains('open'));
    if (persist) rememberLanguage(next);
    if (updateUrl) updateUrlLanguage(next);
  }

  function setContactMethod(elementId, value, href) {
    const container = document.getElementById(elementId);
    if (!container || !value) return false;

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
  const pending = document.getElementById('contact-pending');
  if (pending) pending.hidden = hasEmail || hasPhone;

  const whatsappLink = document.getElementById('whatsapp-link');
  const whatsappNumber = companyPhone.replace(/\D/g, '');

  langButton.addEventListener('click', () => setLanguage(language === 'fr' ? 'en' : 'fr'));

  toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

  // Fermeture au clavier (Échap) et au clic hors du menu.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setMenuOpen(false);
  });

  // En repassant sur grand écran, on remet le menu dans son état neutre.
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BREAKPOINT && nav.classList.contains('open')) {
      setMenuOpen(false);
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!companyEmail) {
        formStatus.textContent = copy[language].formReady;
        return;
      }

      const data = new FormData(contactForm);
      const subject = encodeURIComponent(copy[language].subject);
      const body = encodeURIComponent(
        `Nom / Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
      );
      formStatus.textContent = copy[language].formOpening;
      window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  setLanguage(language, { persist: false, updateUrl: false });
})();
