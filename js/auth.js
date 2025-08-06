import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqGSBrsJ-7PIpfjAM58gD8h4VcY793rWQ",
  authDomain: "studyhub-proje.firebaseapp.com",
  projectId: "studyhub-proje",
  storageBucket: "studyhub-proje.appspot.com",
  messagingSenderId: "359347355393",
  appId: "1:359347355393:web:8c05ede417c10c272d6500",
  measurementId: "G-DMQJNJW9S0"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Éléments DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleLoginBtn = document.getElementById('googleLogin');
const forgotPasswordBtn = document.getElementById('forgotPassword');
const messageDiv = document.getElementById('message');
const resetModal = document.getElementById('resetModal');
const resetForm = document.getElementById('resetForm');
const resetEmailInput = document.getElementById('resetEmail');
const closeModalBtn = document.getElementById('closeModal');

// Fonction pour afficher les messages
function showMessage(message, isSuccess = false) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Fonction pour gérer l'état de chargement
function setLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Connexion par email/mot de passe
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    if (!email || !password) {
        showMessage('Veuillez remplir tous les champs', false);
        return;
    }
    
    setLoading(submitBtn, true);
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Stocker les informations utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email
        }));
        localStorage.setItem('userToken', await user.getIdToken());
        
        showMessage('Connexion réussie ! Redirection...', true);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Erreur de connexion:', error);
        let errorMessage = 'Erreur de connexion';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Aucun compte trouvé avec cet email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Mot de passe incorrect';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Trop de tentatives. Réessayez plus tard';
                break;
            default:
                errorMessage = error.message;
        }
        
        showMessage(errorMessage, false);
    } finally {
        setLoading(submitBtn, false);
    }
});

// Connexion avec Google
googleLoginBtn.addEventListener('click', async () => {
    setLoading(googleLoginBtn, true);
    
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Stocker les informations utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email
        }));
        localStorage.setItem('userToken', await user.getIdToken());
        
        showMessage('Connexion Google réussie ! Redirection...', true);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Erreur Google:', error);
        showMessage('Erreur lors de la connexion Google', false);
    } finally {
        setLoading(googleLoginBtn, false);
    }
});

// Gestion du modal de réinitialisation
forgotPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    resetModal.style.display = 'none';
    resetEmailInput.value = '';
});

// Fermer le modal en cliquant à l'extérieur
resetModal.addEventListener('click', (e) => {
    if (e.target === resetModal) {
        resetModal.style.display = 'none';
        resetEmailInput.value = '';
    }
});

// Formulaire de réinitialisation
resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = resetEmailInput.value.trim();
    const submitBtn = resetForm.querySelector('button[type="submit"]');
    
    if (!email) {
        showMessage('Veuillez saisir votre adresse email', false);
        return;
    }
    
    setLoading(submitBtn, true);
    
    try {
        await sendPasswordResetEmail(auth, email);
        showMessage('Email de réinitialisation envoyé ! Vérifiez votre boîte mail', true);
        resetModal.style.display = 'none';
        resetEmailInput.value = '';
    } catch (error) {
        console.error('Erreur réinitialisation:', error);
        let errorMessage = 'Erreur lors de l\'envoi';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Aucun compte trouvé avec cet email';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide';
                break;
            default:
                errorMessage = error.message;
        }
        
        showMessage(errorMessage, false);
    } finally {
        setLoading(submitBtn, false);
    }
});

// Vérifier l'état d'authentification au chargement
onAuthStateChanged(auth, (user) => {
    if (user) {
        // L'utilisateur est déjà connecté, rediriger vers le dashboard
        window.location.href = 'dashboard.html';
    }
});

// Gestion des erreurs de validation en temps réel
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (email && !isValidEmail(email)) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '#e5e7eb';
    }
});

passwordInput.addEventListener('blur', () => {
    const password = passwordInput.value;
    if (password && password.length < 6) {
        passwordInput.style.borderColor = '#ef4444';
    } else {
        passwordInput.style.borderColor = '#e5e7eb';
    }
});

// Fonction de validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gestion des touches pour fermer le modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resetModal.style.display === 'block') {
        resetModal.style.display = 'none';
        resetEmailInput.value = '';
    }
});