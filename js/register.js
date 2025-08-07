import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
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
const registerForm = document.getElementById('registerForm');
const displayNameInput = document.getElementById('displayName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const googleRegisterBtn = document.getElementById('googleRegister');
const messageDiv = document.getElementById('message');

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

// Validation des mots de passe
function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password.length < 6) {
        showMessage('Le mot de passe doit contenir au moins 6 caractères', false);
        return false;
    }
    
    if (password !== confirmPassword) {
        showMessage('Les mots de passe ne correspondent pas', false);
        return false;
    }
    
    return true;
}

// Validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Inscription par email/mot de passe
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const displayName = displayNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    
    // Validations
    if (!displayName || !email || !password || !confirmPassword) {
        showMessage('Veuillez remplir tous les champs', false);
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Veuillez saisir une adresse email valide', false);
        return;
    }
    
    if (!validatePasswords()) {
        return;
    }
    
    if (!termsAccepted) {
        showMessage('Veuillez accepter les conditions d\'utilisation', false);
        return;
    }
    
    setLoading(submitBtn, true);
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Mettre à jour le profil avec le nom d'affichage
        await updateProfile(user, {
            displayName: displayName
        });
        
        // Stocker les informations utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: displayName
        }));
        localStorage.setItem('userToken', await user.getIdToken());
        
        showMessage('Compte créé avec succès ! Redirection...', true);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Erreur d\'inscription:', error);
        let errorMessage = 'Erreur lors de la création du compte';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Cette adresse email est déjà utilisée';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Adresse email invalide';
                break;
            case 'auth/weak-password':
                errorMessage = 'Le mot de passe est trop faible';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'L\'inscription par email est désactivée';
                break;
            default:
                errorMessage = error.message;
        }
        
        showMessage(errorMessage, false);
    } finally {
        setLoading(submitBtn, false);
    }
});

// Inscription avec Google
googleRegisterBtn.addEventListener('click', async () => {
    setLoading(googleRegisterBtn, true);
    
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
        
        showMessage('Compte créé avec Google ! Redirection...', true);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Erreur Google:', error);
        showMessage('Erreur lors de l\'inscription avec Google', false);
    } finally {
        setLoading(googleRegisterBtn, false);
    }
});

// Vérifier l'état d'authentification au chargement
// On ne fait rien ici, la redirection se fait uniquement après soumission réussie du formulaire.

// Validation en temps réel
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

confirmPasswordInput.addEventListener('blur', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else {
        confirmPasswordInput.style.borderColor = '#e5e7eb';
    }
});

// Validation des mots de passe en temps réel
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else if (confirmPassword) {
        confirmPasswordInput.style.borderColor = '#e5e7eb';
    }
});

confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else {
        confirmPasswordInput.style.borderColor = '#e5e7eb';
    }
});