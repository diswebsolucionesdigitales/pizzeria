// Configuración de seguridad
const ADMIN_PASSWORD = "pizzeria123"; // Cambia esta contraseña

// Verificar si ya está logueado
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('admin_loggedin') === 'true') {
        showAdminPanel();
    }
});

// Manejar login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('admin_loggedin', 'true');
        showAdminPanel();
        errorElement.textContent = '';
    } else {
        errorElement.textContent = 'Contraseña incorrecta';
    }
});

// Cerrar sesión
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('admin_loggedin');
    showLoginForm();
});

function showAdminPanel() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
}

function showLoginForm() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('login-form').reset();
}