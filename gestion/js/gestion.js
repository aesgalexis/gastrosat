function cargarVista(vista) {
    document.getElementById("contenido").innerHTML = "Cargando...";
    fetch(`views/${vista}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("contenido").innerHTML = html;
            if (vista === "ofertas") {
                cargarOfertas();
            } else if (vista === "clientes") {
                cargarClientes();
            }
        })
        .catch(error => console.error("Error al cargar la vista:", error));
}

// Cargar por defecto la vista de ofertas
window.onload = () => cargarVista("ofertas");
