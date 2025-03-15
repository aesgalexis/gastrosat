function cargarOfertas() {
    const tabla = document.getElementById("tabla-ofertas");
    tabla.innerHTML = "<tr><td colspan='4'>Cargando...</td></tr>";

    db.collection("ofertas").get()
    .then(snapshot => {
        if (snapshot.empty) {
            tabla.innerHTML = "<tr><td colspan='4'>No hay ofertas registradas</td></tr>";
            return;
        }

        tabla.innerHTML = "";
        snapshot.forEach(doc => {
            const oferta = doc.data();
            const fila = `
                <tr>
                    <td>${oferta.ofertaId}</td>
                    <td>${oferta.nombre}</td>
                    <td>${oferta.importe.toFixed(2)} €</td>
                    <td>
                        <button onclick="editarOferta('${doc.id}')">✏️ Editar</button>
                        <button onclick="generarPDF('${doc.id}')">📄 PDF</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    })
    .catch(error => console.error("❌ Error al cargar ofertas:", error));
}

function editarOferta(ofertaId) {
    cargarVista("oferta-form");
    setTimeout(() => cargarDatosOferta(ofertaId), 500);
}
