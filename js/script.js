// Cargar el archivo JSON
fetch('/js/jsno/data.json')
    .then(response => response.json())
    .then(data => {
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
    });

// Formulario de contacto (simulado)
document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente!");
});
