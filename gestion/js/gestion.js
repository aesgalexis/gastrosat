function cargarVista(vista) {
    console.log(`📂 Intentando cargar vista: ${vista}`);

    fetch(`views/${vista}.html`)
        .then(response => {
            if (!response.ok) throw new Error("❌ No se pudo cargar la vista.");
            return response.text();
        })
        .then(html => {
            document.getElementById("contenido").innerHTML = html;
            console.log(`✅ Vista ${vista} cargada correctamente.`);

            // Eliminar cualquier script previo antes de cargar nuevos
            document.getElementById("scripts").innerHTML = "";

            // Cargar script de la vista correspondiente
            const script = document.createElement("script");
            script.src = `js/${vista}.js`;
            script.onload = () => console.log(`📜 Script ${vista}.js cargado.`);
            document.getElementById("scripts").appendChild(script);
        })
        .catch(error => console.error("❌ Error al cargar la vista:", error));
}
