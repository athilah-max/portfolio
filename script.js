// 1. GESTION DU DIAPORAMA TYPE CANVA
const sectionsArray = ['home', 'about', 'projects', 'contact'];
let currentIndex = 0;

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dots = document.querySelectorAll('.dot');

// Fonction principale pour changer de "slide"
function navigateTo(index, direction) {
    // Retirer les états actifs
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => {
        section.classList.remove('active-section', 'slide-right', 'slide-left');
    });

    // Afficher la nouvelle slide avec la bonne animation
    const targetId = sectionsArray[index];
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add('active-section');
    targetSection.classList.add(direction === 'right' ? 'slide-right' : 'slide-left');
    
    // Mettre à jour le menu en haut
    const activeLink = document.querySelector(`.nav-link[data-index="${index}"]`);
    if(activeLink) activeLink.classList.add('active');

    // Mettre à jour l'index actuel et l'interface du bas
    currentIndex = index;
    updateBottomNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mettre à jour la barre de navigation du bas
function updateBottomNav() {
    // Les petits points
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentIndex]) dots[currentIndex].classList.add('active');
    
    // Griser le bouton précédent sur la première page
    btnPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
    btnPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    
    // Griser le bouton suivant sur la dernière page
    btnNext.style.opacity = currentIndex === sectionsArray.length - 1 ? '0.3' : '1';
    btnNext.style.pointerEvents = currentIndex === sectionsArray.length - 1 ? 'none' : 'auto';
}

// Clics sur les flèches bas de page
btnNext?.addEventListener('click', () => {
    if(currentIndex < sectionsArray.length - 1) navigateTo(currentIndex + 1, 'right');
});

btnPrev?.addEventListener('click', () => {
    if(currentIndex > 0) navigateTo(currentIndex - 1, 'left');
});

// Clics sur les petits points
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if(index === currentIndex) return;
        const direction = index > currentIndex ? 'right' : 'left';
        navigateTo(index, direction);
    });
});

// Clics sur le menu principal en haut
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const index = parseInt(this.getAttribute('data-index'));
        if(index === currentIndex) return;
        const direction = index > currentIndex ? 'right' : 'left';
        navigateTo(index, direction);
    });
});

// Fonction pour les boutons dans le texte (ex: "Me contacter")
function goToSlide(index) {
    const direction = index > currentIndex ? 'right' : 'left';
    navigateTo(index, direction);
}

// Initialisation
updateBottomNav();

// 2. GESTION DES FILTRES DE PROJETS
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

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
        e.preventDefault(); 
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        contactForm.reset();
    });
}
