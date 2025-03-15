// 🔹 Función para cargar clientes desde Firebase y mostrarlos en la tabla
function cargarClientes() {
    console.log("📡 Intentando conectar con Firebase...");

    const tabla = document.getElementById("tabla-clientes");
    if (!tabla) {
        console.error("❌ No se encontró la tabla de clientes.");
        return;
    }

    tabla.innerHTML = "<tr><td colspan='5'>Cargando...</td></tr>";

    db.collection("clientes").orderBy("nombre", "asc").get()
    .then(snapshot => {
        console.log("✅ Clientes obtenidos:", snapshot.docs.length);

        if (snapshot.empty) {
            tabla.innerHTML = "<tr><td colspan='5'>No hay clientes registrados</td></tr>";
            return;
        }

        // 🔥 Forzar la actualización eliminando todos los nodos antes de insertar nuevos datos
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }

        snapshot.forEach(doc => {
            const cliente = doc.data();
            console.log("📄 Insertando en la tabla:", cliente);

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${cliente.nombre || "-"}</td>
                <td>${cliente.cif || "-"}</td>
                <td>${cliente.telefono || "-"}</td>
                <td>${cliente.email || "-"}</td>
                <td>
                    <button onclick="editarCliente('${doc.id}')">✏️ Editar</button>
                    <button class="delete-btn" onclick="eliminarCliente('${doc.id}')">🗑️ Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });

        console.log("✅ Tabla actualizada correctamente.");
        console.log("📊 Contenido actual de la tabla:", tabla.innerHTML);
    })
    .catch(error => console.error("❌ Error al cargar clientes:", error));
}

// 🔹 FORZAR CARGA AUTOMÁTICA TRAS LA CARGA DE LA PÁGINA
window.onload = function () {
    console.log("🚀 Página cargada, iniciando carga de clientes...");

    // 🔹 Método 1: Retrasar la ejecución para asegurar que el DOM está listo
    setTimeout(() => {
        cargarClientes();
    }, 1000);

    // 🔹 Método 2: Comprobar si la tabla está disponible y reintentar
    const interval = setInterval(() => {
        const tabla = document.getElementById("tabla-clientes");
        if (tabla) {
            console.log("✅ Tabla detectada en el DOM. Cargando clientes...");
            cargarClientes();
            clearInterval(interval); // Detener el intervalo tras la primera carga exitosa
        }
    }, 500);
};
