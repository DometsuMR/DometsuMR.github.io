fetch('js/json/data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById("nombre").textContent = data.nombre;
        document.getElementById("descripcion").textContent = data.descripcion;
        document.getElementById("contacto").href = data.contacto;
        
        let habilidadesHTML = "";
        data.habilidades.forEach(habilidad => {
            habilidadesHTML += `
                <div class="habilidad">
                    <p>${habilidad.nombre}</p>
                    <div class="barra">
                        <div class="barra-progreso" style="width: 0" data-nivel="${habilidad.nivel}%"></div>
                    </div>
                </div>
            `;
        });
        document.getElementById("lista-habilidades").innerHTML = habilidadesHTML;
        
        let proyectosHTML = "";
        data.proyectos.forEach(proyecto => {
            proyectosHTML += `
                <div class="proyecto">
                    <h3>${proyecto.nombre}</h3>
                    <p>${proyecto.descripcion}</p>
                </div>
            `;
        });
        document.getElementById("lista-proyectos").innerHTML = proyectosHTML;
        
        document.querySelectorAll('.barra-progreso').forEach(barra => {
            setTimeout(() => {
                barra.style.width = barra.getAttribute('data-nivel');
            }, 300);
        });
    })
    .catch(error => console.error('Error cargando JSON:', error));

// Modo Oscuro
const toggleButton = document.getElementById("toggle-mode");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
});