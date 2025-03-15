// gestion.js
function cargarVista(vista) {
    fetch(`./${vista}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("contenido").innerHTML = html;
            if (vista === "clientes") {
                cargarClientes();
            }
        })
        .catch(error => console.error("❌ Error al cargar la vista:", error));
}
