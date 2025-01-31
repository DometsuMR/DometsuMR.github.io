// Inicializar EmailJS con tu Public Key
emailjs.init("EtE00FZeRLtEJmtsb");  // Reemplaza con tu Public Key

// Escuchar el evento de envío del formulario
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional

    // Usar EmailJS para enviar el formulario
    emailjs.sendForm('service_l8juotg', 'template_80llqig', this)
        .then(function(response) {
            console.log("Mensaje enviado", response);
            document.getElementById('respuesta').textContent = "¡Mensaje enviado correctamente!";
        }, function(error) {
            console.log("Error al enviar el mensaje", error);
            document.getElementById('respuesta').textContent = "Hubo un problema al enviar el mensaje.";
        });
});
