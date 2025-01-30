// Cargar el archivo JSON
fetch('/js/jsno/data.json')
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
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

    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

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
