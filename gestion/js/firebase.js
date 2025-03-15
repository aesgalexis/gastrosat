// Evitar múltiples inicializaciones
if (!window._firebaseInitialized) {
    window._firebaseInitialized = true;

    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAst9f2-Jro1d4OX0henL8OeKXT4Ds35uA",
        authDomain: "factu-f58ab.firebaseapp.com",
        projectId: "factu-f58ab",
        storageBucket: "factu-f58ab.firebasestorage.app",
        messagingSenderId: "126560099435",
        appId: "1:126560099435:web:483f6c5d68ab3217c3652e",
        measurementId: "G-MC2S07WMSL"
    };

    firebase.initializeApp(firebaseConfig);

    // Definir db y auth como variables globales en `window`
    window.db = firebase.firestore();
    window.auth = firebase.auth();

    // Verificar autenticación una sola vez al cargar la página
    window.auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "../"; // Redirigir si no está autenticado
        }
    });
}
