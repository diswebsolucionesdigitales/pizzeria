// Funcionalidad del panel de administración
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (localStorage.getItem('admin_loggedin') !== 'true') {
        return; // No cargar funcionalidad si no está logueado
    }
    
    loadAdminPizzas();
    setupPizzaForm();
});

function loadAdminPizzas() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || defaultPizzas;
    renderAdminPizzas(pizzas);
}

function renderAdminPizzas(pizzas) {
    const adminPizzaList = document.getElementById('admin-pizza-list');
    adminPizzaList.innerHTML = '';
    
    pizzas.forEach(pizza => {
        const adminItem = document.createElement('div');
        adminItem.className = 'admin-item';
        adminItem.innerHTML = `
            <div class="admin-item-info">
                <img src="${pizza.image}" alt="${pizza.name}" class="admin-item-image">
                <div class="admin-item-details">
                    <h3>${pizza.name}</h3>
                    <p>${pizza.description}</p>
                    <p><strong>Precio: $${pizza.price.toFixed(2)}</strong></p>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editPizza(${pizza.id})">Editar</button>
                <button class="btn-delete" onclick="deletePizza(${pizza.id})">Eliminar</button>
            </div>
        `;
        adminPizzaList.appendChild(adminItem);
    });
}

function setupPizzaForm() {
    document.getElementById('pizza-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('pizza-id').value;
        const name = document.getElementById('pizza-name').value;
        const description = document.getElementById('pizza-description').value;
        const price = parseFloat(document.getElementById('pizza-price').value);
        const image = document.getElementById('pizza-image').value;
        
        let pizzas = JSON.parse(localStorage.getItem('pizzas')) || defaultPizzas;
        
        if (id) {
            // Editar pizza existente
            const index = pizzas.findIndex(pizza => pizza.id === parseInt(id));
            if (index !== -1) {
                pizzas[index] = { id: parseInt(id), name, description, price, image };
            }
        } else {
            // Agregar nueva pizza
            const newId = pizzas.length > 0 ? Math.max(...pizzas.map(p => p.id)) + 1 : 1;
            pizzas.push({ id: newId, name, description, price, image });
        }
        
        // Guardar en localStorage
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
        
        // Actualizar la vista
        renderAdminPizzas(pizzas);
        
        // Limpiar formulario
        this.reset();
        document.getElementById('pizza-id').value = '';
        document.getElementById('submit-btn').textContent = 'Guardar Pizza';
    });
}

function editPizza(id) {
    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || defaultPizzas;
    const pizza = pizzas.find(p => p.id === id);
    
    if (pizza) {
        document.getElementById('pizza-id').value = pizza.id;
        document.getElementById('pizza-name').value = pizza.name;
        document.getElementById('pizza-description').value = pizza.description;
        document.getElementById('pizza-price').value = pizza.price;
        document.getElementById('pizza-image').value = pizza.image;
        document.getElementById('submit-btn').textContent = 'Actualizar Pizza';
        
        // Scroll al formulario
        document.getElementById('pizza-form').scrollIntoView({ behavior: 'smooth' });
    }
}

function deletePizza(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta pizza?')) {
        let pizzas = JSON.parse(localStorage.getItem('pizzas')) || defaultPizzas;
        pizzas = pizzas.filter(pizza => pizza.id !== id);
        
        localStorage.setItem('pizzas', JSON.stringify(pizzas));
        renderAdminPizzas(pizzas);
    }
}

// Datos iniciales (mismos que en app.js)
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