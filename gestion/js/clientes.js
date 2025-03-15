// 🔹 Cargar clientes desde Firebase y mostrarlos en la tabla
function cargarClientes() {
    const tabla = document.getElementById("tabla-clientes");
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
                    <td>${cliente.nombre}</td>
                    <td>${cliente.cif}</td>
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

// 🔹 Mostrar formulario para agregar nuevo cliente
function mostrarFormularioCliente() {
    cargarVista("cliente-form");
}

// 🔹 Redirigir a la edición de un cliente
function editarCliente(clienteId) {
    cargarVista("cliente-form");
    setTimeout(() => cargarDatosCliente(clienteId), 500);
}

// 🔹 Eliminar un cliente de Firebase
function eliminarCliente(clienteId) {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    db.collection("clientes").doc(clienteId).delete()
    .then(() => {
        alert("✅ Cliente eliminado correctamente.");
        cargarClientes(); // Recargar la lista
    })
    .catch(error => console.error("❌ Error al eliminar cliente:", error));
}

// 🔹 Cargar clientes automáticamente al cargar la vista
window.onload = () => cargarClientes();
