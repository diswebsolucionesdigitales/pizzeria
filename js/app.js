// Datos iniciales de ejemplo
const defaultPizzas = [
    {
        id: 1,
        name: "Margherita",
        description: "Salsa de tomate, mozzarella fresca y albahaca",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Pepperoni",
        description: "Salsa de tomate, mozzarella y pepperoni",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Cuatro Quesos",
        description: "Mozzarella, gorgonzola, parmesano y fontina",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// Cargar pizzas al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadPizzas();
});

function loadPizzas() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || defaultPizzas;
    renderPizzas(pizzas);
}

function renderPizzas(pizzas) {
    const pizzaList = document.getElementById('pizza-list');
    pizzaList.innerHTML = '';
    
    pizzas.forEach(pizza => {
        const pizzaCard = document.createElement('div');
        pizzaCard.className = 'pizza-card';
        pizzaCard.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}" class="pizza-image">
            <div class="pizza-info">
                <h3 class="pizza-name">${pizza.name}</h3>
                <p class="pizza-description">${pizza.description}</p>
                <p class="pizza-price">$${pizza.price.toFixed(2)}</p>
            </div>
        `;
        pizzaList.appendChild(pizzaCard);
    });
}