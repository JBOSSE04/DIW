// Variables globales
const apiUrl = 'https://api.escuelajs.co/api/v1';
const cartIcon = document.getElementById('cart-icon');
const cart = document.getElementById('cart');
const cartItems = document.querySelector('.cart__items');
const cartTotal = document.getElementById('cart-total');
const categoriesGrid = document.getElementById('categories-grid');
const productsSection = document.getElementById('products-section');
const productsGrid = document.getElementById('products-grid');
const productDetail = document.getElementById('product-detail');
const backButton = document.getElementById('back-button');
const mainContent = document.querySelector('main');
const scrollUp = document.getElementById('scroll-up');
const header = document.querySelector('.header');
const preloader = document.getElementById('preloader');
const navLinks = document.querySelectorAll('.nav__link');

let cartProducts = [];
let currentView = 'categories';

// Cargar productos por categoría
async function loadProducts(categoryId) {
    try {
        showLoading();
        const response = await fetch(`${apiUrl}/categories/${categoryId}/products`);
        const products = await response.json();
        
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.images[0] || 'https://via.placeholder.com/300'}" alt="${product.title}" class="product-card__image">
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.title}</h3>
                    <p class="product-card__price">$${product.price}</p>
                </div>
            `;
            
            // Agregar evento de clic al producto
            productCard.addEventListener('click', () => {
                console.log('Producto clickeado:', product.id); // Debug
                showProductDetail(product.id);
            });
            
            productsGrid.appendChild(productCard);
        });
        
        productsSection.classList.remove('hidden');
        currentView = 'products';
        
        // Scroll suave a la sección de productos
        productsSection.scrollIntoView({ behavior: 'smooth' });
        hideLoading();
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error al cargar los productos');
        hideLoading();
    }
}

// Mostrar detalle del producto
async function showProductDetail(productId) {
    try {
        console.log('Mostrando detalle del producto:', productId); // Debug
        showLoading();
        
        const response = await fetch(`${apiUrl}/products/${productId}`);
        if (!response.ok) {
            throw new Error('Error al cargar el producto');
        }
        const product = await response.json();
        console.log('Datos del producto:', product); // Debug

        const images = product.images && product.images.length > 0 
            ? product.images 
            : ['https://via.placeholder.com/300'];

        // Ocultar contenido principal y mostrar detalle
        mainContent.style.display = 'none';
        productDetail.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        currentView = 'detail';

        const detailContent = document.querySelector('.product-detail__content');
        detailContent.innerHTML = `
            <div class="product-detail__images">
                <img src="${images[0]}" alt="${product.title}" class="product-detail__main-image">
                ${images.length > 1 ? `
                    <div class="product-detail__thumbnails">
                        ${images.map((img, index) => `
                            <img src="${img}" 
                                alt="${product.title} - imagen ${index + 1}" 
                                class="product-detail__thumbnail"
                                onclick="changeMainImage('${img}')"
                            >
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="product-detail__info">
                <h2 class="product-detail__title">${product.title}</h2>
                <p class="product-detail__price">$${product.price}</p>
                <p class="product-detail__description">${product.description || 'Sin descripción disponible'}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <i class="fas fa-shopping-cart"></i>
                    Agregar al Carrito
                </button>
            </div>
        `;

        hideLoading();
    } catch (error) {
        console.error('Error loading product detail:', error);
        showNotification('Error al cargar el detalle del producto');
        hideLoading();
    }
}

// Función para cambiar la imagen principal
window.changeMainImage = function(src) {
    const mainImage = document.querySelector('.product-detail__main-image');
    if (mainImage) {
        mainImage.src = src;
    }
};

// Función para manejar el botón de volver
function handleBack() {
    if (currentView === 'detail') {
        productDetail.classList.add('hidden');
        mainContent.style.display = 'block';
        document.body.style.overflow = '';
        currentView = 'products';
    } else if (currentView === 'products') {
        productsSection.classList.add('hidden');
        currentView = 'categories';
    }
}

// Event Listeners
backButton.addEventListener('click', handleBack);

// Inicializar la aplicación
async function initializeApp() {
    try {
        const response = await fetch(`${apiUrl}/categories`);
        const categories = await response.json();
        const topCategories = categories.slice(0, 5);
        
        categoriesGrid.innerHTML = topCategories.map(category => `
            <div class="category-card" onclick="loadProducts(${category.id})" style="cursor: pointer;">
                <img src="${category.image}" alt="${category.name}">
                <div class="category-card__content">
                    <h3 class="category-card__title">${category.name}</h3>
                </div>
            </div>
        `).join('');
        
        hideLoading();
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification('Error al cargar las categorías');
        hideLoading();
    }
}

// Función para mostrar el loader
function showLoading() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'flex';
    }
}

// Función para ocultar el loader
function hideLoading() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
}

// Función para mostrar notificaciones
function showNotification(message) {
    alert(message); // Implementar un sistema de notificaciones más elegante
}

// Inicializar la aplicación cuando se carga la página
window.addEventListener('load', () => {
    setTimeout(() => {
        hidePreloader();
        initializeApp();
    }, 1000);
});

// Función para ocultar el preloader inicial
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Event listener para el scroll
window.addEventListener('scroll', function() {
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
    
    if (this.scrollY > 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

// Variables
const cartCount = document.querySelector('.cart-count');

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCount.textContent = cartProducts.length;
}

// Función para agregar producto al carrito
function addToCart(product) {
    cartProducts.push(product);
    updateCartCount();
    showNotification('Producto añadido al carrito');
}

// Función para mostrar el carrito
function toggleCart() {
    cart.classList.toggle('show');
}

// Event Listeners
cartIcon.addEventListener('click', toggleCart);

// Navegación del menú
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll to top when clicking scroll-up button
scrollUp.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
