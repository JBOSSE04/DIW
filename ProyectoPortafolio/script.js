// Scroll suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mostrar y ocultar el menú móvil
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Cerrar menú al hacer clic en un enlace (móvil)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// Animación de carga para los elementos
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.animado').forEach(element => {
    observer.observe(element);
});
