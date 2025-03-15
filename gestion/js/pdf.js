function generarPDF(ofertaId) {
    db.collection("ofertas").doc(ofertaId).get()
    .then(doc => {
        if (!doc.exists) {
            alert("Oferta no encontrada.");
            return;
        }

        const oferta = doc.data();
        const { jsPDF } = window.jspdf;
        const docPDF = new jsPDF();

        docPDF.text("Oferta - GastroSat", 20, 20);
        docPDF.text(`Cliente: ${oferta.nombre}`, 20, 30);
        docPDF.text(`Importe: ${oferta.importe.toFixed(2)} €`, 20, 40);

        docPDF.save(`Oferta_${oferta.ofertaId}.pdf`);
    })
    .catch(error => console.error("Error al generar PDF:", error));
}
