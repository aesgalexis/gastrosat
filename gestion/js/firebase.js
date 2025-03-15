const firebaseConfig = {
    apiKey: "AIzaSyAst9f2-Jro1d4OX0henL8OeKXT4Ds35uA",
    authDomain: "factu-f58ab.firebaseapp.com",
    projectId: "factu-f58ab",
    storageBucket: "factu-f58ab.firebasestorage.app",
    messagingSenderId: "126560099435",
    appId: "1:126560099435:web:483f6c5d68ab3217c3652e",
    measurementId: "G-MC2S07WMSL"
};

// ✅ Inicializar Firebase solo si no ha sido inicializado antes
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ✅ Asegurar que los servicios están disponibles antes de usarlos
const auth = firebase.auth();
const db = firebase.firestore(); // 🔧 Esto previene el error `firebase.firestore is not a function`

// ✅ Definir usuario autorizado ANTES de usarlo
const usuarioAutorizado = "aesg.alexis@gmail.com";

// 🔒 Función para verificar autenticación y bloquear acceso si es necesario
function verificarAutenticacion() {
    auth.onAuthStateChanged((user) => {
        if (!user || user.email !== usuarioAutorizado) {
            console.warn("⚠ Acceso NO autorizado. Redirigiendo a login...");
            window.location.href = "/gestion/login.html";
        }
    });
}

// 🔐 Función para iniciar sesión con Google
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // 🔧 PREVENIR PROBLEMAS CON COOKIES DE TERCEROS EN CHROME
    provider.setCustomParameters({
        prompt: "select_account"
    });

    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        if (user.email !== usuarioAutorizado) {
            alert("❌ Acceso denegado");
            auth.signOut();
        } else {
            console.log("✅ Sesión iniciada correctamente.");
            window.location.href = "/gestion/index.html";
        }
    }).catch((error) => {
        console.error("❌ Error en login:", error);
    });
}

// 🚪 Función para cerrar sesión
function logout() {
    auth.signOut().then(() => {
        console.log("✅ Sesión cerrada. Redirigiendo a login...");
        window.location.href = "/gestion/login.html";
    }).catch((error) => console.error("❌ Error al cerrar sesión:", error));
}
