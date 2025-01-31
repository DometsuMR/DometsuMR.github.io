<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $correo = filter_var($_POST["correo"], FILTER_VALIDATE_EMAIL);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    if (!$correo) {
        echo "Correo inválido.";
        exit;
    }

    $destinatario = "dometsumr@gmail.com";
    $asunto = "Mensaje de Contacto de $nombre";
    $contenido = "Nombre: $nombre\nCorreo: $correo\nMensaje:\n" . nl2br($mensaje);
    $headers = "From: no-reply@tudominio.com\r\n";
    $headers .= "Reply-To: $correo\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>
