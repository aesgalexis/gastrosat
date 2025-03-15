console.log("🚀 `clientes.js` cargado correctamente.");

// 🔹 Funciones globales
window.cargarClientes = cargarClientes;
window.agregarCliente = agregarCliente;
window.editarCliente = editarCliente;
window.eliminarCliente = eliminarCliente;

// 🔹 Esperar a que la tabla esté en el DOM antes de ejecutar `cargarClientes()`
document.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 DOM completamente cargado, esperando a que la tabla esté disponible...");
    const interval = setInterval(() => {
        const tabla = document.getElementById("tabla-clientes");
        if (tabla) {
            console.log("✅ Tabla encontrada en el DOM. Cargando clientes...");
            clearInterval(interval);
            cargarClientes();
        } else {
            console.warn("⏳ La tabla aún no está disponible. Reintentando...");
        }
    }, 300);
});

// 🔹 Función para cargar clientes en la tabla
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

        tabla.innerHTML = "";

        snapshot.forEach(doc => {
            const cliente = doc.data();
            console.log("📄 Insertando en la tabla:", cliente);

            const fila = `
                <tr>
                    <td>${cliente.nombre || "-"}</td>
                    <td>${cliente.cif || "-"}</td>
                    <td>${cliente.telefono || "-"}</td>
                    <td>${cliente.email || "-"}</td>
                    <td>
                        <button onclick="editarCliente('${doc.id}')">✏️ Editar</button>
                        <button class="delete-btn" onclick="eliminarCliente('${doc.id}')">🗑️ Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });

        console.log("✅ Tabla actualizada correctamente.");
    })
    .catch(error => console.error("❌ Error al cargar clientes:", error));
}
