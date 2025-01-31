document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    emailjs.sendForm("service_l8juotg", "template_e7rv45n", this, "EtE00FZeRLtEJmtsb")
        .then(function(response) {
            document.getElementById("respuesta").innerText = "¡Mensaje enviado con éxito!";
        }, function(error) {
            document.getElementById("respuesta").innerText = "Hubo un error al enviar el mensaje.";
            console.error('Error al enviar el correo:', error);  // Detalles del error
        });
});
