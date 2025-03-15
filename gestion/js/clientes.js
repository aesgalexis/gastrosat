console.log("🚀 `clientes.js` cargado correctamente.");

// 🔹 Asignar funciones globalmente para que los botones las encuentren
window.cargarClientes = cargarClientes;
window.agregarCliente = agregarCliente;
window.editarCliente = editarCliente;
window.eliminarCliente = eliminarCliente;

// 🔹 Función para cargar clientes
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
    })
    .catch(error => console.error("❌ Error al cargar clientes:", error));
}

// 🔹 Agregar un cliente
function agregarCliente() {
    console.log("➕ Agregar Cliente pulsado");
    const nombre = prompt("Ingrese el nombre del cliente:");
    const cif = prompt("Ingrese el CIF:");
    const telefono = prompt("Ingrese el teléfono:");
    const email = prompt("Ingrese el correo electrónico:");

    if (!nombre || !email) {
        alert("❌ Nombre y correo son obligatorios.");
        return;
    }

    db.collection("clientes").add({
        nombre,
        cif: cif || "-",
        telefono: telefono || "-",
        email,
        creado: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("✅ Cliente agregado correctamente.");
        cargarClientes();
    })
    .catch(error => console.error("❌ Error al agregar cliente:", error));
}

// 🔹 Editar cliente
function editarCliente(clienteId) {
    console.log("✏️ Editar Cliente pulsado:", clienteId);
    db.collection("clientes").doc(clienteId).get()
    .then(doc => {
        if (!doc.exists) {
            alert("❌ Cliente no encontrado.");
            return;
        }

        const cliente = doc.data();
        const nuevoNombre = prompt("Editar Nombre:", cliente.nombre);
        const nuevoCIF = prompt("Editar CIF:", cliente.cif);
        const nuevoTelefono = prompt("Editar Teléfono:", cliente.telefono);
        const nuevoEmail = prompt("Editar Email:", cliente.email);

        db.collection("clientes").doc(clienteId).update({
            nombre: nuevoNombre,
            cif: nuevoCIF,
            telefono: nuevoTelefono,
            email: nuevoEmail
        })
        .then(() => {
            alert("✅ Cliente actualizado correctamente.");
            cargarClientes();
        })
        .catch(error => console.error("❌ Error al actualizar cliente:", error));
    });
}

// 🔹 Eliminar cliente
function eliminarCliente(clienteId) {
    console.log("🗑️ Eliminar Cliente pulsado:", clienteId);
    if (!confirm("⚠️ ¿Seguro que quieres eliminar este cliente?")) return;

    db.collection("clientes").doc(clienteId).delete()
    .then(() => {
        alert("✅ Cliente eliminado correctamente.");
        cargarClientes();
    })
    .catch(error => console.error("❌ Error al eliminar cliente:", error));
}
