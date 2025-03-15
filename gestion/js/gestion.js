function cargarVista(vista) {
    document.getElementById("contenido").innerHTML = "Cargando...";
    fetch(`views/${vista}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("contenido").innerHTML = html;
            if (vista === "ofertas") {
                const script = document.createElement("script");
                script.src = "js/ofertas.js";
                document.body.appendChild(script);
            }
        })
        .catch(error => console.error("Error al cargar la vista:", error));
}

window.onload = () => cargarVista("ofertas");
