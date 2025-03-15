function cargarVista(vista) {
    document.getElementById("contenido").innerHTML = "Cargando...";
    fetch(`views/${vista}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se encontró la vista: ${vista}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("contenido").innerHTML = html;

            // Cargar script correspondiente si es necesario
            if (vista === "clientes") {
                cargarScript("js/clientes.js");
            } else if (vista === "cliente-form") {
                cargarScript("js/cliente-form.js");
            }
        })
        .catch(error => console.error("❌ Error al cargar vista:", error));
}

// Función para cargar scripts dinámicamente
function cargarScript(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.defer = true;
    document.body.appendChild(script);
}

// Cargar la vista por defecto al abrir la página
window.onload = () => cargarVista("clientes");
