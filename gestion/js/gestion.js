// 🔹 Función para cargar dinámicamente una vista
function cargarVista(vista) {
    console.log(`📂 Intentando cargar vista: ${vista}`);

    fetch(`views/${vista}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`❌ No se pudo cargar la vista: ${vista}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("contenido").innerHTML = html;
            console.log(`✅ Vista ${vista} cargada correctamente.`);

            // ✅ Esperamos a que la vista esté completamente cargada antes de ejecutar su JS
            setTimeout(() => {
                cargarScriptVista(vista);
            }, 300);
        })
        .catch(error => console.error(`❌ Error al cargar la vista:`, error));
}

// 🔹 Función para cargar el script JS asociado a cada vista
function cargarScriptVista(vista) {
    const script = document.createElement("script");
    script.src = `js/${vista}.js`;
    script.defer = true;

    script.onload = () => console.log(`✅ Script ${vista}.js cargado correctamente.`);
    script.onerror = () => console.error(`❌ Error al cargar el script ${vista}.js`);

    document.body.appendChild(script);
}
