// clientes.js
function cargarClientes() {
    console.log("📡 Cargando clientes...");
    const tabla = document.getElementById("tabla-clientes");
    
    if (!tabla) {
        console.error("❌ No se encontró la tabla de clientes.");
        return;
    }

    tabla.innerHTML = "<tr><td colspan='5'>Cargando...</td></tr>";

    db.collection("clientes").orderBy("nombre", "asc").get()
    .then(snapshot => {
        if (snapshot.empty) {
            tabla.innerHTML = "<tr><td colspan='5'>No hay clientes registrados</td></tr>";
            return;
        }

        tabla.innerHTML = "";

        snapshot.forEach(doc => {
            const cliente = doc.data();
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
    })
    .catch(error => console.error("❌ Error al cargar clientes:", error));
}
