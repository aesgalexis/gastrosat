function cargarVista(vista) {
    document.getElementById("contenido").innerHTML = "Cargando...";
    fetch(`views/${vista}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("contenido").innerHTML = html;

            // Cargar el script correspondiente solo si es necesario
            if (vista === "ofertas") {
                cargarScript("js/ofertas.js");
            } else if (vista === "clientes") {
                cargarScript("js/clientes.js");
            }
        })
        .catch(error => console.error("Error al cargar la vista:", error));
}

// Función para cargar dinámicamente scripts JS
function cargarScript(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.defer = true;
    document.body.appendChild(script);
}

// Cargar por defecto la vista de ofertas al abrir la página
window.onload = () => cargarVista("ofertas");
