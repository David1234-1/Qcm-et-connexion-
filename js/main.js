// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .step, .testimonial-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Fonction pour afficher les messages
function showMessage(message, isSuccess = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${isSuccess ? '#10b981' : '#ef4444'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// CSS pour les animations de message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fonction pour charger les données utilisateur
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        // Mettre à jour l'interface avec les données utilisateur
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.innerHTML = `
                <span>Bonjour, ${user.displayName || user.email}</span>
                <button onclick="logout()">Déconnexion</button>
            `;
        }
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
}

// Fonction pour vérifier l'authentification
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('userToken');
    
    if (!user || !token) {
        // Rediriger vers la page de connexion si pas authentifié
        if (window.location.pathname.includes('dashboard') || 
            window.location.pathname.includes('import') ||
            window.location.pathname.includes('qcm') ||
            window.location.pathname.includes('flashcards')) {
            window.location.href = 'login.html';
        }
    }
}

// Initialiser les vérifications d'authentification
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserData();
});

// Fonction pour formater les dates
function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fonction pour générer un ID unique
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Fonction pour valider les fichiers PDF
function validatePDF(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
        showMessage('Veuillez sélectionner un fichier PDF valide', false);
        return false;
    }
    
    if (file.size > maxSize) {
        showMessage('Le fichier est trop volumineux (max 10MB)', false);
        return false;
    }
    
    return true;
}

// Fonction pour simuler la génération IA
function simulateAIGeneration(content) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulation de génération de QCM et flashcards
            const qcm = generateSampleQCM(content);
            const flashcards = generateSampleFlashcards(content);
            const summary = generateSampleSummary(content);
            
            resolve({
                qcm: qcm,
                flashcards: flashcards,
                summary: summary
            });
        }, 2000);
    });
}

// Fonction pour générer des QCM d'exemple
function generateSampleQCM(content) {
    return [
        {
            id: generateId(),
            question: "Qu'est-ce que la cardiologie ?",
            options: [
                "L'étude du cœur et des vaisseaux sanguins",
                "L'étude du cerveau",
                "L'étude des poumons",
                "L'étude du système digestif"
            ],
            correctAnswer: 0,
            explanation: "La cardiologie est la spécialité médicale qui étudie le cœur et les vaisseaux sanguins."
        },
        {
            id: generateId(),
            question: "Quel est le rôle principal du cœur ?",
            options: [
                "Produire de l'énergie",
                "Pomper le sang dans le corps",
                "Filtrer le sang",
                "Stocker l'oxygène"
            ],
            correctAnswer: 1,
            explanation: "Le cœur a pour fonction principale de pomper le sang pour irriguer tous les organes du corps."
        }
    ];
}

// Fonction pour générer des flashcards d'exemple
function generateSampleFlashcards(content) {
    return [
        {
            id: generateId(),
            question: "Qu'est-ce que la cardiologie ?",
            answer: "La cardiologie est la spécialité médicale qui étudie le cœur et les vaisseaux sanguins."
        },
        {
            id: generateId(),
            question: "Quel est le rôle du cœur ?",
            answer: "Le cœur pompe le sang pour irriguer tous les organes du corps."
        }
    ];
}

// Fonction pour générer un résumé d'exemple
function generateSampleSummary(content) {
    return {
        title: "Résumé du cours",
        content: "Ce cours couvre les fondamentaux de la cardiologie, incluant l'anatomie du cœur, la physiologie cardiaque, et les principales pathologies cardiovasculaires.",
        keyPoints: [
            "Anatomie du cœur",
            "Physiologie cardiaque",
            "Pathologies cardiovasculaires",
            "Méthodes de diagnostic"
        ]
    };
}

// Export des fonctions pour utilisation dans d'autres fichiers
window.showMessage = showMessage;
window.formatDate = formatDate;
window.generateId = generateId;
window.validatePDF = validatePDF;
window.simulateAIGeneration = simulateAIGeneration;
window.logout = logout;