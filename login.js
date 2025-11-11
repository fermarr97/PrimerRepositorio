class Usuario {
    constructor(username, password, name) {
        this.username = username
        this.password = password
        this.name = name
    }
}

usuarios = [
    new Usuario("admin", "admin", "Administrador")
]

function login_button_click() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    login(username, password);
}

function login(username, password) {
    const user = usuarios.find(u => u.username === username && u.password === password);
    if (user) {
        window.location.href = "app.html";
    } else {
        alert("Credenciales incorrectas");;
    }
}

function register_button_click() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password_confirm").value;
    const name = document.getElementById("name").value;

    if (password !== password_confirm) {
        alert("Las contraseñas no coinciden");
        return;
    }

   register(username, password, name);
}
    

function register(username, password, name) {
    if (usuarios.find(u => u.username === username)) {
        alert("El nombre de usuario ya existe");
        return;
    }
    const newUser = new Usuario(username, password, name);
    usuarios.push(newUser);
    alert("Usuario registrado correctamente");
    window.location.href = "app.html";
}