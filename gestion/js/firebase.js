const firebaseConfig = {
    apiKey: "AIzaSyAst9f2-Jro1d4OX0henL8OeKXT4Ds35uA",
    authDomain: "factu-f58ab.firebaseapp.com",
    projectId: "factu-f58ab",
    storageBucket: "factu-f58ab.firebasestorage.app",
    messagingSenderId: "126560099435",
    appId: "1:126560099435:web:483f6c5d68ab3217c3652e",
    measurementId: "G-MC2S07WMSL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Usuario autorizado
const usuarioAutorizado = "tucorreo@gmail.com";

// Verificar si el usuario está autenticado
auth.onAuthStateChanged((user) => {
    if (!user || user.email !== usuarioAutorizado) {
        window.location.href = "/login.html"; // Redirige si no está autorizado
    }
});

// Función de login con Google
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        if (user.email !== usuarioAutorizado) {
            alert("Acceso denegado");
            auth.signOut();
        } else {
            window.location.href = "/gestion/index.html";
        }
    }).catch((error) => c
