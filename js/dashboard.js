// Variables globales
let currentUser = null;
let userData = {
    courses: [],
    qcm: [],
    flashcards: [],
    resumes: [],
    matieres: [],
    stats: {
        totalCourses: 0,
        totalQcm: 0,
        totalFlashcards: 0,
        averageScore: 0
    }
};

// Variables pour le visionneur PDF
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialisation...');
    checkAuth();
    loadUserData();
    initializeEventListeners();
    updateDashboard();
    updateUserName();
    
    // Initialiser les traductions
    if (typeof updateTranslations === 'function') {
        updateTranslations();
    }
});

// Vérification de l'authentification
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('userToken');
    
    if (!user || !token) {
        console.log('Non authentifié, redirection vers login');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(user);
        console.log('Utilisateur connecté:', currentUser);
    } catch (error) {
        console.error('Erreur parsing utilisateur:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userToken');
        window.location.href = 'login.html';
    }
}

// Chargement des données utilisateur
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        try {
            userData = JSON.parse(savedData);
            console.log('Données utilisateur chargées');
        } catch (error) {
            console.error('Erreur chargement données:', error);
            userData = {
                courses: [],
                qcm: [],
                flashcards: [],
                resumes: [],
                matieres: [],
                stats: {
                    totalCourses: 0,
                    totalQcm: 0,
                    totalFlashcards: 0,
                    averageScore: 0
                }
            };
        }
    }
}

// Sauvegarde des données utilisateur
function saveUserData() {
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Données sauvegardées');
    } catch (error) {
        console.error('Erreur sauvegarde:', error);
    }
}

// Initialisation des événements
function initializeEventListeners() {
    console.log('Initialisation des événements...');
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            console.log('Navigation vers:', section);
            showSection(section);
        });
    });
    
    // Gestion du drag & drop pour les fichiers
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        console.log('Configuration upload area...');
        
        uploadArea.addEventListener('click', function() {
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.click();
            }
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#2563eb';
            this.style.backgroundColor = '#eff6ff';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e5e7eb';
            this.style.backgroundColor = 'white';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e5e7eb';
            this.style.backgroundColor = 'white';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                console.log('Fichier déposé:', files[0].name);
                handleFileUpload(files[0]);
            }
        });
    }
    
    // Gestion de la sélection de fichier
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                console.log('Fichier sélectionné:', e.target.files[0].name);
                handleFileUpload(e.target.files[0]);
            }
        });
    }
    
    // Gestion du formulaire de création de matière
    const createMatiereForm = document.getElementById('createMatiereForm');
    if (createMatiereForm) {
        createMatiereForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('matiereName');
            const colorInput = document.getElementById('matiereColor');
            const descriptionInput = document.getElementById('matiereDescription');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const color = colorInput ? colorInput.value : '#2563eb';
            const description = descriptionInput ? descriptionInput.value.trim() : '';
            
            if (!name) {
                showMessage('Veuillez saisir un nom de matière', false);
                return;
            }
            
            createMatiere(name, color, description);
            closeCreateMatiereModal();
        });
    }
    
    // Gestion du formulaire de profil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile();
        });
    }
    
    // Gestion du formulaire de changement de mot de passe
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            changePassword();
        });
    }
    
    // Gestion de l'entrée dans le chat
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Gestion du sélecteur de langue
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = localStorage.getItem('language') || 'fr';
        languageSelect.addEventListener('change', function() {
            if (typeof changeLanguage === 'function') {
                changeLanguage(this.value);
            }
        });
    }
}

// Affichage des sections
function showSection(sectionId) {
    console.log('Affichage section:', sectionId);
    
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour la navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Gestion de l'upload de fichiers
function handleFileUpload(file) {
    console.log('Traitement fichier:', file.name);
    
    if (!validatePDF(file)) {
        return;
    }
    
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    
    // Afficher la progression
    const progressContainer = document.getElementById('importProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressContainer && progressFill && progressText) {
        progressContainer.style.display = 'block';
        
        // Lire le fichier PDF
        const reader = new FileReader();
        reader.onload = function(e) {
            const pdfData = e.target.result;
            
            // Simuler la progression
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                
                progressFill.style.width = progress + '%';
                
                if (progress < 30) {
                    progressText.textContent = 'Analyse du document...';
                } else if (progress < 60) {
                    progressText.textContent = 'Extraction du contenu...';
                } else if (progress < 90) {
                    progressText.textContent = 'Génération des QCM et flashcards...';
                } else {
                    progressText.textContent = 'Finalisation...';
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        completeFileUpload(fileName, fileSize, pdfData);
                    }, 500);
                }
            }, 200);
        };
        
        reader.readAsDataURL(file);
    }
}

// Validation des fichiers PDF
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

// Finalisation de l'upload
function completeFileUpload(fileName, fileSize, pdfData) {
    console.log('Finalisation upload:', fileName);
    
    const progressContainer = document.getElementById('importProgress');
    if (progressContainer) {
        progressContainer.style.display = 'none';
    }
    
    // Récupérer les options
    const matiereSelect = document.getElementById('matiereSelect');
    const qcmCountSelect = document.getElementById('qcmCount');
    const difficultySelect = document.getElementById('difficulty');
    const flashcardsCountSelect = document.getElementById('flashcardsCount');
    
    const matiereId = matiereSelect ? matiereSelect.value : '';
    const qcmCount = qcmCountSelect ? parseInt(qcmCountSelect.value) : 10;
    const difficulty = difficultySelect ? difficultySelect.value : 'moyen';
    const flashcardsCount = flashcardsCountSelect ? parseInt(flashcardsCountSelect.value) : 20;
    
    // Créer un nouveau cours
    const course = {
        id: generateId(),
        name: fileName.replace('.pdf', ''),
        fileName: fileName,
        fileSize: fileSize,
        date: new Date().toISOString(),
        qcmCount: qcmCount,
        flashcardsCount: flashcardsCount,
        difficulty: difficulty,
        matiereId: matiereId,
        pdfData: pdfData
    };
    
    // Générer les QCM et flashcards
    const qcm = generateSampleQCM(course.name, qcmCount, difficulty);
    const flashcards = generateSampleFlashcards(course.name, flashcardsCount);
    const resume = generateSampleResume(course.name);
    
    // Associer à la matière si sélectionnée
    if (matiereId) {
        qcm.forEach(q => q.matiereId = matiereId);
        flashcards.forEach(f => f.matiereId = matiereId);
        resume.matiereId = matiereId;
    }
    
    // Ajouter aux données utilisateur
    userData.courses.push(course);
    userData.qcm.push(...qcm);
    userData.flashcards.push(...flashcards);
    userData.resumes.push(resume);
    
    // Mettre à jour les statistiques
    updateStats();
    saveUserData();
    
    // Mettre à jour l'affichage
    updateDashboard();
    
    showMessage(`Cours "${course.name}" importé avec succès ! ${qcmCount} QCM et ${flashcardsCount} flashcards générés.`, true);
    
    // Rediriger vers le dashboard
    setTimeout(() => {
        showSection('dashboard');
    }, 2000);
}

// Génération de QCM d'exemple
function generateSampleQCM(courseName, count, difficulty) {
    const qcm = [];
    const questions = [
        {
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
            question: "Quel est le rôle principal du cœur ?",
            options: [
                "Produire de l'énergie",
                "Pomper le sang dans le corps",
                "Filtrer le sang",
                "Stocker l'oxygène"
            ],
            correctAnswer: 1,
            explanation: "Le cœur a pour fonction principale de pomper le sang dans tout le corps."
        },
        {
            question: "Combien de cavités possède le cœur ?",
            options: [
                "2 cavités",
                "3 cavités",
                "4 cavités",
                "5 cavités"
            ],
            correctAnswer: 2,
            explanation: "Le cœur possède 4 cavités : 2 oreillettes et 2 ventricules."
        }
    ];
    
    for (let i = 0; i < count; i++) {
        const questionIndex = i % questions.length;
        const question = questions[questionIndex];
        
        qcm.push({
            id: generateId(),
            courseId: courseName,
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            difficulty: difficulty,
            date: new Date().toISOString()
        });
    }
    
    return qcm;
}

// Génération de flashcards d'exemple
function generateSampleFlashcards(courseName, count) {
    const flashcards = [];
    const cards = [
        {
            question: "Définissez la cardiologie",
            answer: "La cardiologie est la spécialité médicale qui étudie le cœur et les vaisseaux sanguins."
        },
        {
            question: "Quel est le rôle du cœur ?",
            answer: "Le cœur pompe le sang dans tout le corps pour distribuer l'oxygène et les nutriments."
        },
        {
            question: "Combien de cavités a le cœur ?",
            answer: "Le cœur a 4 cavités : 2 oreillettes et 2 ventricules."
        }
    ];
    
    for (let i = 0; i < count; i++) {
        const cardIndex = i % cards.length;
        const card = cards[cardIndex];
        
        flashcards.push({
            id: generateId(),
            courseId: courseName,
            question: card.question,
            answer: card.answer,
            date: new Date().toISOString(),
            learned: false
        });
    }
    
    return flashcards;
}

// Génération de résumé d'exemple
function generateSampleResume(courseName) {
    return {
        id: generateId(),
        courseId: courseName,
        title: `Résumé - ${courseName}`,
        content: `Ce cours couvre les fondamentaux de ${courseName}. Il aborde les concepts clés, les mécanismes principaux et les applications pratiques dans le domaine médical.`,
        keyPoints: [
            "Concepts fondamentaux",
            "Mécanismes principaux",
            "Applications pratiques",
            "Points d'attention clinique"
        ],
        date: new Date().toISOString()
    };
}

// Mise à jour des statistiques
function updateStats() {
    userData.stats.totalCourses = userData.courses.length;
    userData.stats.totalQcm = userData.qcm.length;
    userData.stats.totalFlashcards = userData.flashcards.length;
    
    // Calculer le score moyen (simulé)
    const scores = userData.qcm.map(() => Math.floor(Math.random() * 40) + 60); // 60-100%
    userData.stats.averageScore = scores.length > 0 ? 
        Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
}

// Mise à jour du dashboard
function updateDashboard() {
    console.log('Mise à jour dashboard...');
    updateStats();
    updateRecentCourses();
    
    // Mettre à jour les listes
    updateMatieresList();
    updateQcmList();
    updateFlashcardsList();
    updateResumesList();
    updateStatsDisplay();
    updateCourseSelects();
}

// Mise à jour des cours récents
function updateRecentCourses() {
    const container = document.getElementById('recentCoursesList');
    if (!container) return;
    
    if (userData.courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-pdf"></i>
                <h3 data-translate="no_courses">Aucun cours importé</h3>
                <p data-translate="start_import">Commencez par importer votre premier cours</p>
                <button onclick="showSection('import')" class="btn-primary">
                    <span data-translate="import_course">Importer un cours</span>
                </button>
            </div>
        `;
        return;
    }
    
    const recentCourses = userData.courses.slice(-3).reverse();
    container.innerHTML = recentCourses.map(course => `
        <div class="course-card">
            <div class="course-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="course-info">
                <h3>${course.name}</h3>
                <p>${course.fileSize} MB • ${formatDate(course.date)}</p>
                <div class="course-stats">
                    <span>${course.qcmCount} QCM</span>
                    <span>${course.flashcardsCount} Flashcards</span>
                </div>
            </div>
            <div class="course-actions">
                <button onclick="openPdfViewer('${course.id}')" class="btn-secondary" title="Voir le PDF">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Mise à jour de la liste des QCM
function updateQcmList() {
    const container = document.getElementById('qcmList');
    if (!container) return;
    
    if (userData.qcm.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-question-circle"></i>
                <h3 data-translate="no_qcm">Aucun QCM disponible</h3>
                <p data-translate="import_for_qcm">Importez un cours pour générer des QCM</p>
                <button onclick="showSection('import')" class="btn-primary">
                    <span data-translate="import_course">Importer un cours</span>
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userData.qcm.map(qcm => `
        <div class="qcm-card">
            <div class="qcm-header">
                <h3>${qcm.question}</h3>
                <span>${formatDate(qcm.date)}</span>
            </div>
            <div class="qcm-options">
                ${qcm.options.map((option, index) => `
                    <div class="qcm-option">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
            <div class="qcm-actions">
                <button onclick="startQcm('${qcm.id}')" class="btn-primary">
                    <i class="fas fa-play"></i>
                    Commencer
                </button>
            </div>
        </div>
    `).join('');
}

// Mise à jour de la liste des flashcards
function updateFlashcardsList() {
    const container = document.getElementById('flashcardsList');
    if (!container) return;
    
    if (userData.flashcards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-layer-group"></i>
                <h3 data-translate="no_flashcards">Aucune flashcard disponible</h3>
                <p data-translate="import_for_flashcards">Importez un cours pour générer des flashcards</p>
                <button onclick="showSection('import')" class="btn-primary">
                    <span data-translate="import_course">Importer un cours</span>
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userData.flashcards.map(flashcard => `
        <div class="flashcard-card">
            <div class="flashcard-header">
                <h3>${flashcard.question}</h3>
                <span>${formatDate(flashcard.date)}</span>
            </div>
            <div class="flashcard-content">
                <p><strong>Réponse :</strong> ${flashcard.answer}</p>
            </div>
            <div class="flashcard-actions">
                <button onclick="startFlashcards('${flashcard.id}')" class="btn-primary">
                    <i class="fas fa-play"></i>
                    Réviser
                </button>
            </div>
        </div>
    `).join('');
}

// Mise à jour de la liste des matières
function updateMatieresList() {
    const container = document.getElementById('matieresGrid');
    if (!container) return;
    
    if (userData.matieres.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <h3 data-translate="no_subjects">Aucune matière créée</h3>
                <p data-translate="create_first_subject">Créez votre première matière pour organiser vos cours</p>
                <button onclick="showCreateMatiereModal()" class="btn-primary">
                    <span data-translate="create_subject">Créer une matière</span>
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userData.matieres.map(matiere => {
        const courseCount = userData.courses.filter(c => c.matiereId === matiere.id).length;
        const qcmCount = userData.qcm.filter(q => q.matiereId === matiere.id).length;
        const flashcardCount = userData.flashcards.filter(f => f.matiereId === matiere.id).length;
        
        return `
            <div class="matiere-card" style="border-left-color: ${matiere.color}">
                <div class="matiere-header">
                    <h3>${matiere.name}</h3>
                    <div class="matiere-actions">
                        <button class="btn-view" onclick="viewMatiere('${matiere.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-edit" onclick="editMatiere('${matiere.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deleteMatiere('${matiere.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${matiere.description ? `<p style="color: #64748b; margin-bottom: 1rem;">${matiere.description}</p>` : ''}
                <div class="matiere-stats">
                    <span class="matiere-stat">${courseCount} cours</span>
                    <span class="matiere-stat">${qcmCount} QCM</span>
                    <span class="matiere-stat">${flashcardCount} flashcards</span>
                </div>
            </div>
        `;
    }).join('');
}

// Mise à jour des sélecteurs de cours
function updateCourseSelects() {
    const matiereSelect = document.getElementById('matiereSelect');
    const courseSelect = document.getElementById('courseSelect');
    
    // Mettre à jour le sélecteur de matières
    if (matiereSelect) {
        matiereSelect.innerHTML = '<option value="" data-translate="select_subject">Sélectionner une matière</option>' +
            userData.matieres.map(matiere => 
                `<option value="${matiere.id}">${matiere.name}</option>`
            ).join('');
    }
    
    // Mettre à jour le sélecteur de cours
    if (courseSelect) {
        courseSelect.innerHTML = '<option value="" data-translate="all_courses">Tous les cours</option>' +
            userData.courses.map(course => 
                `<option value="${course.id}">${course.name}</option>`
            ).join('');
    }
}

// Mise à jour de la liste des résumés
function updateResumesList() {
    const container = document.getElementById('resumesList');
    if (!container) return;
    
    if (userData.resumes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3 data-translate="no_summaries">Aucun résumé disponible</h3>
                <p data-translate="import_for_summaries">Importez un cours pour générer des résumés</p>
                <button onclick="showSection('import')" class="btn-primary">
                    <span data-translate="import_course">Importer un cours</span>
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = userData.resumes.map(resume => `
        <div class="resume-card">
            <div class="resume-header">
                <h3>${resume.title}</h3>
                <span>${formatDate(resume.date)}</span>
            </div>
            <div class="resume-content">
                <p>${resume.content}</p>
                <div class="resume-keypoints">
                    ${resume.keyPoints.map(point => `<span class="keypoint">${point}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Mise à jour de l'affichage des statistiques
function updateStatsDisplay() {
    const coursCount = document.getElementById('coursCount');
    const qcmCount = document.getElementById('qcmCount');
    const flashcardsCount = document.getElementById('flashcardsCount');
    const scoreMoyen = document.getElementById('scoreMoyen');
    const averageScore = document.getElementById('averageScore');
    const globalProgressText = document.getElementById('globalProgressText');
    
    if (coursCount) coursCount.textContent = userData.stats.totalCourses;
    if (qcmCount) qcmCount.textContent = userData.stats.totalQcm;
    if (flashcardsCount) flashcardsCount.textContent = userData.stats.totalFlashcards;
    if (scoreMoyen) scoreMoyen.textContent = userData.stats.averageScore + '%';
    if (averageScore) averageScore.textContent = userData.stats.averageScore + '%';
    if (globalProgressText) globalProgressText.textContent = userData.stats.averageScore + '%';
}

// Fonctions utilitaires
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function showMessage(message, isSuccess = false) {
    console.log('Message:', message, isSuccess);
    
    // Créer un élément de message temporaire
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        background: ${isSuccess ? '#10b981' : '#ef4444'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Fonctions pour les matières
function showCreateMatiereModal() {
    console.log('Ouverture modal création matière');
    const modal = document.getElementById('createMatiereModal');
    if (modal) {
        modal.style.display = 'block';
        const nameInput = document.getElementById('matiereName');
        if (nameInput) nameInput.focus();
    }
}

function closeCreateMatiereModal() {
    const modal = document.getElementById('createMatiereModal');
    if (modal) {
        modal.style.display = 'none';
        const form = document.getElementById('createMatiereForm');
        if (form) form.reset();
    }
}

function createMatiere(name, color, description) {
    console.log('Création matière:', name, color, description);
    
    const matiere = {
        id: generateId(),
        name: name,
        color: color,
        description: description,
        createdAt: new Date().toISOString(),
        courses: [],
        qcm: [],
        flashcards: [],
        resumes: []
    };
    
    userData.matieres.push(matiere);
    saveUserData();
    updateMatieresList();
    updateCourseSelects();
    
    showMessage(`Matière "${name}" créée avec succès !`, true);
}

// Fonctions pour le visionneur PDF
function openPdfViewer(courseId) {
    console.log('Ouverture visionneur PDF pour cours:', courseId);
    
    const course = userData.courses.find(c => c.id === courseId);
    if (!course || !course.pdfData) {
        showMessage('Aucun PDF disponible pour ce cours', false);
        return;
    }
    
    const modal = document.getElementById('pdfViewerModal');
    const title = document.getElementById('pdfViewerTitle');
    
    if (modal && title) {
        title.textContent = course.name;
        modal.style.display = 'block';
        
        // Convertir les données base64 en ArrayBuffer
        const pdfData = atob(course.pdfData.split(',')[1]);
        const pdfArray = new Uint8Array(pdfData.length);
        for (let i = 0; i < pdfData.length; i++) {
            pdfArray[i] = pdfData.charCodeAt(i);
        }
        
        // Charger le PDF
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.getDocument({data: pdfArray}).promise.then(function(pdf) {
                pdfDoc = pdf;
                pageNum = 1;
                renderPage(pageNum);
            }).catch(function(error) {
                console.error('Erreur lors du chargement du PDF:', error);
                showMessage('Erreur lors du chargement du PDF', false);
            });
        } else {
            showMessage('Visionneur PDF non disponible', false);
        }
    }
}

function renderPage(num) {
    if (!pdfDoc) return;
    
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        pageInfo.textContent = `Page ${num} sur ${pdfDoc.numPages}`;
    }
}

function previousPage() {
    if (pageNum <= 1) return;
    pageNum--;
    renderPage(pageNum);
}

function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    renderPage(pageNum);
}

function closePdfViewer() {
    const modal = document.getElementById('pdfViewerModal');
    if (modal) {
        modal.style.display = 'none';
    }
    pdfDoc = null;
    pageNum = 1;
}

// Fonctions pour l'IA Chat
function sendMessage() {
    const input = document.getElementById('chatInput');
    const courseSelect = document.getElementById('courseSelect');
    const message = input ? input.value.trim() : '';
    const selectedCourse = courseSelect ? courseSelect.value : '';
    
    if (!message) return;
    
    // Ajouter le message utilisateur
    addMessage(message, 'user');
    if (input) input.value = '';
    
    // Simuler la réponse de l'IA
    setTimeout(() => {
        const aiResponse = generateAIResponse(message, selectedCourse);
        addMessage(aiResponse, 'ai');
    }, 1000);
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const icon = type === 'ai' ? '<i class="fas fa-robot"></i>' : '';
    messageDiv.innerHTML = `
        <div class="message-content">
            ${icon}
            <p>${content}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message, courseId) {
    const responses = [
        "Excellente question ! Basé sur vos cours, voici ce que je peux vous dire...",
        "D'après le contenu de vos documents, la réponse est...",
        "C'est un concept important. Laissez-moi vous expliquer...",
        "Voici une explication détaillée basée sur vos cours...",
        "Cette question fait référence à un point clé de vos études..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "Cette fonctionnalité utilise l'IA pour analyser vos cours importés et vous fournir des réponses personnalisées.";
}

// Fonctions pour les modals
function startQcm(courseId) {
    showMessage('Fonctionnalité QCM en cours de développement', false);
}

function startFlashcards(courseId) {
    showMessage('Fonctionnalité Flashcards en cours de développement', false);
}

function closeQcmModal() {
    const modal = document.getElementById('qcmModal');
    if (modal) modal.style.display = 'none';
}

function closeFlashcardsModal() {
    const modal = document.getElementById('flashcardsModal');
    if (modal) modal.style.display = 'none';
}

// Fonctions pour le profil
function showProfileModal() {
    console.log('Ouverture modal profil');
    const modal = document.getElementById('profileModal');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const languageSelect = document.getElementById('languageSelect');
    
    if (modal) {
        // Remplir les champs avec les données actuelles
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (firstName) firstName.value = userProfile.firstName || '';
        if (lastName) lastName.value = userProfile.lastName || '';
        if (email) email.value = currentUser ? currentUser.email : '';
        if (languageSelect) languageSelect.value = localStorage.getItem('language') || 'fr';
        
        modal.style.display = 'block';
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'none';
}

function saveProfile() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    
    if (firstName && lastName) {
        const userProfile = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            language: localStorage.getItem('language') || 'fr'
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        // Mettre à jour l'affichage du nom d'utilisateur
        updateUserName();
        
        showMessage('Profil sauvegardé avec succès', true);
        closeProfileModal();
    }
}

function showChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'block';
        closeProfileModal();
    }
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.style.display = 'none';
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');
    
    if (currentPassword && newPassword && confirmNewPassword) {
        if (newPassword.value !== confirmNewPassword.value) {
            showMessage('Les mots de passe ne correspondent pas', false);
            return;
        }
        
        if (newPassword.value.length < 6) {
            showMessage('Le mot de passe doit contenir au moins 6 caractères', false);
            return;
        }
        
        // Simuler le changement de mot de passe
        showMessage('Mot de passe mis à jour avec succès', true);
        closeChangePasswordModal();
        
        // Réinitialiser le formulaire
        const form = document.getElementById('changePasswordForm');
        if (form) form.reset();
    }
}

function selectAvatar() {
    showMessage('Fonctionnalité avatar en cours de développement', true);
}

function updateUserName() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userNameElement = document.getElementById('userName');
    
    if (userNameElement) {
        if (userProfile.firstName) {
            userNameElement.textContent = `Bonjour ${userProfile.firstName}`;
        } else if (currentUser) {
            userNameElement.textContent = currentUser.email;
        } else {
            userNameElement.textContent = 'Chargement...';
        }
    }
}

// Fonctions pour les matières
function viewMatiere(matiereId) {
    const matiere = userData.matieres.find(m => m.id === matiereId);
    if (matiere) {
        showMessage(`Affichage de la matière: ${matiere.name}`, true);
    }
}

function editMatiere(matiereId) {
    const matiere = userData.matieres.find(m => m.id === matiereId);
    if (matiere) {
        showMessage(`Édition de la matière: ${matiere.name}`, true);
    }
}

function deleteMatiere(matiereId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
        userData.matieres = userData.matieres.filter(m => m.id !== matiereId);
        saveUserData();
        updateMatieresList();
        updateCourseSelects();
        showMessage('Matière supprimée avec succès', true);
    }
}

// Export des fonctions pour utilisation globale
window.showSection = showSection;
window.logout = logout;
window.startQcm = startQcm;
window.startFlashcards = startFlashcards;
window.closeQcmModal = closeQcmModal;
window.closeFlashcardsModal = closeFlashcardsModal;
window.showCreateMatiereModal = showCreateMatiereModal;
window.closeCreateMatiereModal = closeCreateMatiereModal;
window.openPdfViewer = openPdfViewer;
window.closePdfViewer = closePdfViewer;
window.previousPage = previousPage;
window.nextPage = nextPage;
window.sendMessage = sendMessage;
window.viewMatiere = viewMatiere;
window.editMatiere = editMatiere;
window.deleteMatiere = deleteMatiere;
window.showProfileModal = showProfileModal;
window.closeProfileModal = closeProfileModal;
window.showChangePasswordModal = showChangePasswordModal;
window.closeChangePasswordModal = closeChangePasswordModal;
window.selectAvatar = selectAvatar;