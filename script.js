/* =========================================
   VIROGUE — JavaScript vanilla
   ========================================= */

// --- Scroll animations (IntersectionObserver) ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open')
    hamburger.classList.toggle('open', isOpen)
    hamburger.setAttribute('aria-expanded', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  // Fermer sur clic lien mobile
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      hamburger.classList.remove('open')
      document.body.style.overflow = ''
    })
  })

  // Fermer sur Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open')
      hamburger.classList.remove('open')
      document.body.style.overflow = ''
    }
  })
}

// --- Filtres portfolio ---
const filterBtns = document.querySelectorAll('.filter-btn')
const portfolioCards = document.querySelectorAll('.portfolio-card[data-sector]')

if (filterBtns.length && portfolioCards.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter

      // Mettre à jour bouton actif
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      // Afficher / masquer les cartes
      portfolioCards.forEach((card) => {
        if (filter === 'all' || card.dataset.sector === filter) {
          card.classList.remove('hidden')
        } else {
          card.classList.add('hidden')
        }
      })
    })
  })
}

// --- Accordéon FAQ ---
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach((item) => {
  const question = item.querySelector('.faq__question')
  if (!question) return

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open')

    // Fermer tous les autres
    faqItems.forEach((i) => i.classList.remove('open'))

    // Ouvrir celui cliqué (si ce n'était pas déjà ouvert)
    if (!isOpen) item.classList.add('open')
  })
})

// --- Formulaire Formspree (gestion AJAX + message succès) ---
const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector('[type="submit"]')
    submitBtn.disabled = true
    submitBtn.textContent = 'Envoi en cours…'

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        contactForm.style.display = 'none'
        formSuccess.style.display = 'block'
      } else {
        throw new Error('Erreur réseau')
      }
    } catch {
      submitBtn.disabled = false
      submitBtn.textContent = 'Envoyer ma demande →'
      alert('Une erreur est survenue. Merci de réessayer ou de nous contacter directement par email.')
    }
  })
}
