
window.onload = function () {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products';

    async function fetchProductos() {
        try {
            const response = await fetch(apiUrl); 
            const productos = await response.json(); 

            const gridProductos = document.getElementById('grid-productos');
            gridProductos.innerHTML = ''; 
            
            productos.slice(0, 5).forEach(producto => { 
                const productoHTML = `
                    <div class="producto">
                        <img src="${producto.images[0]}" alt="${producto.title}" style="width: 150px; height: auto;" />
                        <h3>${producto.title}</h3>
                    </div>`;

                gridProductos.innerHTML += productoHTML;
            });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }

    fetchProductos();
   

};
function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];function agregarAlCarrito(producto) {
        console.log('Producto agregado al carrito:', producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        }
        agregarAlCarrito(id);
       
        
function eliminarDelCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(producto => producto.id === id);
    if (producto) {
        carrito.splice(carrito.indexOf(producto), 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Producto eliminado del carrito:', producto);
    }

    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';
    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.textContent = `${producto.title} - $${producto.price}`;
        carritoElement.appendChild(item);
    });
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';
    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.textContent = `${producto.title} - $${producto.price}`;
        carritoElement.appendChild(item);
    });
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    const carritoElement = document.getElementbyidentifier('carrito');
    carritoElement.innerHTML = '';

    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = 'El carrito está vacío.';
}

//Redirigir a otra pagina pero no cambiamos de html para mostrar los productos de una categoria

function redirigirAPagina(id) {
    window.location.href = `pagina-de-categorias.html?id=${id}`;
}

//Filtramos por categoria para mostrar en acada una sus producto.
function filtrarPorCategoria(id) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const categoria = productos.find(producto => producto.category === id);
    const gridProductos = document.getElementById('grid-productos');
    gridProductos.innerHTML = '';
    categoria.forEach(producto => {
        const productoHTML = `
        
            <div class="producto">
                <img src="${producto.images[0]}" alt="${producto.title}" style="width: 150px; height: auto;" />
                <h3>${producto.title}</h3>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>`;
            
        gridProductos.innerHTML += productoHTML;
        });
        };
        
//Filtrar productos por precio
function filtrarPorPrecio(min, max) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = productosfilter(producto => producto.price >= min && producto.price <= max);
    const gridProductos = document.getElementById('grid.productos')

mostrarCarrito();

//Redirigir a otra pagina pero no cambiamos de html para mostrar los productos de una categoria
function redirigirAPagina(id) {
    window.location.href = `pagina-de-categorias.html?id=${id}`;
}

//Filtramos por categoria para mostrar en acada una sus producto.


function filtrarPorCategoria(id) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const categoria = productos.find(producto => producto.category === id);
    const gridProductos = document.getElementById('grid-productos');
    gridProductos.innerHTML = '';
    categoria.forEach(producto => {
        const productoHTML = `
        
            <div class="producto">
                <img src="${producto.images[0]}" alt="${producto.title}" style="width: 150px; height: auto;" />
                <h3>${producto.title}</h3>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>`;
            
        gridProductos.innerHTML += productoHTML;
        });
        };
        
//Filtrar productos por precio
function filtrarPorPrecio(min, max) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const filtrados = productos.filter(producto => producto.price >= min && producto.price <= max);
    const gridProductos = document.getElementById('grid-productos');
    gridProductos.innerHTML = '';
    filtrados.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.images[0]}" alt="${producto.title}" style="width: 150px; height: auto;" />
                <h3>${producto.title}</h3>
            </div>`;
            
        gridProductos.innerHTML += productoHTML;
        });
        };



        

