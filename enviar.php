<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    $para = "info@gastrosat.com";
    $asunto = "Nuevo mensaje de contacto de $nombre";
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Correo: $email\n";
    $cuerpo .= "Teléfono: $telefono\n\n";
    $cuerpo .= "Mensaje:\n$mensaje";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($para, $asunto, $cuerpo, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>
