// 1. GESTION DE LA NAVIGATION (Single Page Application)
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

function navigateTo(targetId) {
    // Retirer la classe active de tous les liens et sections
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active-section'));

    // Ajouter la classe active à la section ciblée
    document.getElementById(targetId).classList.add('active-section');
    
    // Mettre à jour le statut du lien dans le menu
    const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if(activeLink) activeLink.classList.add('active');

    // Remonter en haut de la page fluidement
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Écouteur de clic sur le menu de navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        navigateTo(targetId);
    });
});

// 2. GESTION DES FILTRES DE PROJETS
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gérer le bouton actif
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filtrer les cartes
        projectItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.getAttribute('data-category').includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// 3. GESTION DU FORMULAIRE DE CONTACT
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement réel de la page
        
        // Cacher le formulaire et montrer le message de confirmation
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        
        // Optionnel : Réinitialiser le formulaire en arrière-plan
        contactForm.reset();
        
        // (Pour un vrai envoi d'email depuis Vercel, il faudra plus tard connecter un service comme Formspree ou EmailJS)
    });
}