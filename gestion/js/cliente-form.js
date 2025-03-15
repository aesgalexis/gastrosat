function guardarCliente() {
    const nombre = document.getElementById("cliente-nombre").value;
    const cif = document.getElementById("cliente-cif").value;
    const telefono = document.getElementById("cliente-telefono").value;
    const email = document.getElementById("cliente-email").value;

    if (!nombre || !cif) {
        alert("⚠️ Nombre y CIF son obligatorios.");
        return;
    }

    const clienteId = `${cif.replace(/\s+/g, "").toUpperCase()}`;

    db.collection("clientes").doc(clienteId).set({
        nombre: nombre,
        cif: clienteId,
        telefono: telefono || null,
        email: email || null
    })
    .then(() => {
        alert("✅ Cliente guardado correctamente.");
        cargarVista("clientes"); // Volver a la lista de clientes
    })
    .catch(error => console.error("❌ Error al guardar cliente:", error));
}

// 🔹 Cargar datos de un cliente para edición
function cargarDatosCliente(clienteId) {
    db.collection("clientes").doc(clienteId).get()
    .then(doc => {
        if (!doc.exists) {
            alert("⚠️ Cliente no encontrado.");
            return;
        }

        const cliente = doc.data();
        document.getElementById("titulo-formulario").innerText = "Editar Cliente";
        document.getElementById("cliente-nombre").value = cliente.nombre;
        document.getElementById("cliente-cif").value = cliente.cif;
        document.getElementById("cliente-telefono").value = cliente.telefono || "";
        document.getElementById("cliente-email").value = cliente.email || "";
    })
    .catch(error => console.error("❌ Error al cargar cliente:", error));
}
