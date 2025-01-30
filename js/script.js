// Datos de ejemplo (para carga dinámica)
const data = {
    nombre: "Juan Pérez",
    descripcion: "Desarrollador Web Full Stack con pasión por crear experiencias interactivas.",
    habilidades: [
        { nombre: "HTML", nivel: 90 },
        { nombre: "CSS", nivel: 85 },
        { nombre: "JavaScript", nivel: 80 },
        { nombre: "React", nivel: 70 },
        { nombre: "Node.js", nivel: 60 }
    ],
    proyectos: [
        { nombre: "Tienda Online", descripcion: "E-commerce con React y Firebase", imagen: "proyecto1.jpg", enlace: "https://github.com/juanperez/tienda-online" },
        { nombre: "Aplicación de Tareas", descripcion: "Aplicación de gestión de tareas con Node.js y MongoDB", imagen: "proyecto2.jpg", enlace: "https://github.com/juanperez/tareas" }
    ]
};

// Cargar datos dinámicamente
document.getElementById("nombre").textContent = data.nombre;
document.getElementById("descripcion").textContent = data.descripcion;

// Habilidades
let habilidadesHTML = "";
data.habilidades.forEach(habilidad => {
    habilidadesHTML += `
        <div class="habilidad">
            <p>${habilidad.nombre}</p>
            <div class="barra">
                <div class="barra-progreso" style="width: ${habilidad.nivel}%"></div>
            </div>
        </div>
    `;
});
document.getElementById("lista-habilidades").innerHTML = habilidadesHTML;

// Proyectos
let proyectosHTML = "";
data.proyectos.forEach(proyecto => {
    proyectosHTML += `
        <div class="proyecto">
            <h3>${proyecto.nombre}</h3>
            <img src="${proyecto.imagen}" alt="${proyecto.nombre}">
            <p>${proyecto.descripcion}</p>
            <a href="${proyecto.enlace}" target="_blank">Ver proyecto</a>
        </div>
    `;
});
document.getElementById("lista-proyectos").innerHTML = proyectosHTML;

// Modo oscuro
const toggleButton = document.getElementById("toggle-mode");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
});

// Formulario de contacto (simulado)
document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente!");
});
