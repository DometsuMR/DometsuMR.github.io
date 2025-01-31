// Variables de salud y enemigos
let saludPersonajeMaxima = 1000;
let saludPersonaje = saludPersonajeMaxima;
let saludEnemigoMaxima;
let saludEnemigo;
let enemigo;
let enemigosEliminados = 0; // Contador de eliminaciones
let enemigos; // Lista de enemigos del JSON

// Cargar datos desde el archivo JSON
fetch('datos.json')
  .then(response => response.json())
  .then(data => {
    // Guardamos los datos del personaje y enemigos
    const personaje = data.personaje;
    enemigos = data.enemigos;

    // Función para seleccionar un enemigo basado en el número de eliminaciones
    function seleccionarEnemigo(forzarTier1 = false) {
      let tierActual = forzarTier1 ? 1 : Math.floor(enemigosEliminados / 10) + 1;
      let enemigosDisponibles = enemigos.filter(e => e.tier === tierActual);

      if (enemigosDisponibles.length === 0) {
        // Si no hay enemigos del tier exacto, busca los más cercanos
        enemigosDisponibles = enemigos.filter(e => e.tier <= tierActual);
      }

      enemigo = enemigosDisponibles[Math.floor(Math.random() * enemigosDisponibles.length)];
      saludEnemigoMaxima = enemigo.salud;
      saludEnemigo = saludEnemigoMaxima;

      // Actualizamos la UI
      actualizarUIEnemigo();
    }

    // Función para iniciar el juego (siempre comienza en Tier 1)
    function iniciarJuego() {
      seleccionarEnemigo(true); // Forzar Tier 1 en el inicio

      document.getElementById("menu-principal").classList.add("oculto");
      document.getElementById("juego").classList.remove("oculto");

      // Restablecer variables de salud y enemigos eliminados
      saludPersonaje = saludPersonajeMaxima;
      enemigosEliminados = 0;
      actualizarBarras();
      actualizarContadorEnemigos();
    }

    // Función para atacar
    function atacar() {
      const dañoPersonaje = Math.floor(Math.random() * 20) + 10;
      saludEnemigo -= dañoPersonaje;

      const dañoEnemigo = Math.floor(Math.random() * 20) + 10;
      saludPersonaje -= dañoEnemigo;

      actualizarBarras();
      document.getElementById("mensaje").innerText = `¡Atacaste! Causaste ${dañoPersonaje}. El enemigo te hizo ${dañoEnemigo}.`;

      comprobarVictoria();
    }

    // Función para defender
    function defender() {
      const dañoEnemigo = Math.floor(Math.random() * 20) + 10;
      const dañoReducido = Math.floor(dañoEnemigo / 2);
      saludPersonaje -= dañoReducido;

      actualizarBarras();
      document.getElementById("mensaje").innerText = `Te defendiste. Recibiste solo ${dañoReducido} de daño.`;

      comprobarVictoria();
    }

    // Función para usar una habilidad
    function habilidad() {
      const efecto = Math.random() > 0.5 ? "cura" : "daño";

      if (efecto === "cura") {
        const curar = Math.floor(Math.random() * 20) + 10;
        saludPersonaje = Math.min(saludPersonajeMaxima, saludPersonaje + curar);
        document.getElementById("mensaje").innerText = `Usaste una habilidad y te curaste ${curar} de salud.`;
      } else {
        const daño = Math.floor(Math.random() * 30) + 20;
        saludEnemigo -= daño;
        document.getElementById("mensaje").innerText = `Usaste una habilidad y causaste ${daño} de daño.`;
      }

      actualizarBarras();
      comprobarVictoria();
    }

    // Función para comprobar victoria o derrota
// Función para comprobar victoria o derrota
function comprobarVictoria() {
    if (saludPersonaje <= 0) {
        document.getElementById("mensaje").innerText = `¡Has sido derrotado por el ${enemigo.nombre}!`;
        deshabilitarBotones();

        // Mostrar botón para volver al menú
        document.getElementById("volver-menu").classList.remove("oculto");
    } else if (saludEnemigo <= 0) {
        enemigosEliminados++; // Aumentar el contador

        // Mensaje de eliminación de enemigo
        document.getElementById("mensaje").innerText = `¡Has eliminado a ${enemigo.nombre}!`;

        // Seleccionar un nuevo enemigo (ahora puede ser de otro tier)
        seleccionarEnemigo();

        actualizarBarras();
        actualizarContadorEnemigos();
    }
}


    // Función para volver al menú principal
    function volverAlMenu() {
      console.log("Volviendo al menú..."); // Depuración

      document.getElementById("juego").classList.add("oculto");
      document.getElementById("menu-principal").classList.remove("oculto");

      // Restablecer variables de salud y eliminaciones
      saludPersonaje = saludPersonajeMaxima;
      enemigosEliminados = 0;

      // Habilitar botones de nuevo
      document.querySelectorAll("button").forEach(boton => boton.disabled = false);

      // Ocultar el botón de volver al menú
      document.getElementById("volver-menu").classList.add("oculto");
    }

    // Actualizar las barras de salud
    function actualizarBarras() {
      document.getElementById("barra-personaje").style.width = `${(saludPersonaje / saludPersonajeMaxima) * 100}%`;
      document.getElementById("barra-enemigo").style.width = `${(saludEnemigo / saludEnemigoMaxima) * 100}%`;

      document.getElementById("salud-personaje").innerText = `${saludPersonaje}/${saludPersonajeMaxima}`;
      document.getElementById("salud-enemigo").innerText = `${saludEnemigo}/${saludEnemigoMaxima}`;
    }

    // Actualizar la interfaz del enemigo
    function actualizarUIEnemigo() {
      document.getElementById("enemigo").querySelector(".imagen").src = enemigo.imagen;
      document.getElementById("mensaje").innerText = `¡Te enfrentas a un ${enemigo.nombre} de Tier ${enemigo.tier}!`;
    }

    // Deshabilitar los botones al perder
    function deshabilitarBotones() {
      document.querySelectorAll("button").forEach(boton => boton.disabled = true);
    }

    // Actualizar el contador de enemigos eliminados
    function actualizarContadorEnemigos() {
      document.getElementById("contador").innerText = enemigosEliminados;
    }
    // Función para salir del juego y regresar a la página principal (index.html)
    function salirJuego() {
        // Redirigir a la página index.html que está en la raíz
        window.location.href = '../index.html';
    }


    // Exponer funciones globalmente
    window.iniciarJuego = iniciarJuego;
    window.salirJuego = salirJuego
    window.atacar = atacar;
    window.defender = defender;
    window.habilidad = habilidad;
    window.volverAlMenu = volverAlMenu;
  })
  .catch(error => console.error("Error al cargar el JSON:", error));
