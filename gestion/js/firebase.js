// ✅ Importar Firebase con el sistema modular correcto
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ✅ Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAst9f2-Jro1d4OX0henL8OeKXT4Ds35uA",
    authDomain: "factu-f58ab.firebaseapp.com",
    projectId: "factu-f58ab",
    storageBucket: "factu-f58ab.firebasestorage.app",
    messagingSenderId: "126560099435",
    appId: "1:126560099435:web:483f6c5d68ab3217c3652e",
    measurementId: "G-MC2S07WMSL"
};

// ✅ Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Usuario autorizado
const usuarioAutorizado = "aesg.alexis@gmail.com";

// 🔒 Función para verificar autenticación y bloquear acceso si es necesario
function verificarAutenticacion() {
    onAuthStateChanged(auth, (user) => {
        if (!user || user.email !== usuarioAutorizado) {
            console.warn("⚠ Acceso NO autorizado. Redirigiendo a login...");
            window.location.href = "/gestion/login.html";
        }
    });
}

// 🔐 Función para iniciar sesión con Google
function login() {
    const provider = new GoogleAuthProvider();
    
    // 🔧 Evitar problemas con Chrome
    provider.setCustomParameters({
        prompt: "select_account"
    });

    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        if (user.email !== usuarioAutorizado) {
            alert("❌ Acceso denegado");
            signOut(auth);
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
    signOut(auth).then(() => {
        console.log("✅ Sesión cerrada. Redirigiendo a login...");
        window.location.href = "/gestion/login.html";
    }).catch((error) => console.error("❌ Error al cerrar sesión:", error));
}
