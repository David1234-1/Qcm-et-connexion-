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
    checkAuth();
    loadUserData();
    initializeEventListeners();
    updateDashboard();
});

// Vérification de l'authentification
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('userToken');
    
    if (!user || !token) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(user);
    document.getElementById('userName').textContent = currentUser.displayName || currentUser.email;
}

// Chargement des données utilisateur
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// Sauvegarde des données utilisateur
function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Initialisation des événements
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
        });
    });

    // Upload de fichiers
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

// Affichage des sections
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    document.getElementById(sectionId).classList.add('active');
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
}

// Gestion de l'upload de fichiers
function handleFileUpload(file) {
    if (!validatePDF(file)) {
        return;
    }
    
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    
    // Afficher la progression
    const progressContainer = document.getElementById('importProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
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
    const progressContainer = document.getElementById('importProgress');
    progressContainer.style.display = 'none';
    
    // Récupérer les options
    const matiereId = document.getElementById('matiereSelect').value;
    const qcmCount = parseInt(document.getElementById('qcmCount').value);
    const difficulty = document.getElementById('difficulty').value;
    const flashcardsCount = parseInt(document.getElementById('flashcardsCount').value);
    
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
            explanation: "Le cœur a pour fonction principale de pomper le sang pour irriguer tous les organes du corps."
        },
        {
            question: "Qu'est-ce que l'hypertension artérielle ?",
            options: [
                "Une pression artérielle normale",
                "Une pression artérielle élevée",
                "Une pression artérielle basse",
                "Un trouble du rythme cardiaque"
            ],
            correctAnswer: 1,
            explanation: "L'hypertension artérielle est une pression artérielle anormalement élevée."
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
            userAnswer: null,
            isCorrect: null
        });
    }
    
    return qcm;
}

// Génération de flashcards d'exemple
function generateSampleFlashcards(courseName, count) {
    const flashcards = [];
    const cards = [
        {
            question: "Qu'est-ce que la cardiologie ?",
            answer: "La cardiologie est la spécialité médicale qui étudie le cœur et les vaisseaux sanguins."
        },
        {
            question: "Quel est le rôle du cœur ?",
            answer: "Le cœur pompe le sang pour irriguer tous les organes du corps."
        },
        {
            question: "Qu'est-ce que l'hypertension ?",
            answer: "L'hypertension est une pression artérielle anormalement élevée."
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
            isLearned: false,
            reviewCount: 0
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
        content: `Ce cours couvre les fondamentaux de la ${courseName.toLowerCase()}, incluant l'anatomie, la physiologie, et les principales pathologies.`,
        keyPoints: [
            "Anatomie de base",
            "Physiologie fondamentale",
            "Pathologies principales",
            "Méthodes de diagnostic"
        ],
        date: new Date().toISOString()
    };
}

// Mise à jour des statistiques
function updateStats() {
    userData.stats.totalCourses = userData.courses.length;
    userData.stats.totalQcm = userData.qcm.length;
    userData.stats.totalFlashcards = userData.flashcards.length;
    
    // Calculer le score moyen
    const answeredQcm = userData.qcm.filter(q => q.userAnswer !== null);
    if (answeredQcm.length > 0) {
        const correctAnswers = answeredQcm.filter(q => q.isCorrect).length;
        userData.stats.averageScore = Math.round((correctAnswers / answeredQcm.length) * 100);
    }
}

// Mise à jour du dashboard
function updateDashboard() {
    // Mettre à jour les statistiques
    document.getElementById('coursCount').textContent = userData.stats.totalCourses;
    document.getElementById('qcmCount').textContent = userData.stats.totalQcm;
    document.getElementById('flashcardsCount').textContent = userData.stats.totalFlashcards;
    document.getElementById('scoreMoyen').textContent = userData.stats.averageScore + '%';
    
    // Mettre à jour les cours récents
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
    
    if (userData.courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-pdf"></i>
                <h3>Aucun cours importé</h3>
                <p>Commencez par importer votre premier cours</p>
                <button onclick="showSection('import')" class="btn-primary">
                    Importer un cours
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
    
    if (userData.qcm.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-question-circle"></i>
                <h3>Aucun QCM disponible</h3>
                <p>Importez un cours pour générer des QCM</p>
                <button onclick="showSection('import')" class="btn-primary">
                    Importer un cours
                </button>
            </div>
        `;
        return;
    }
    
    // Grouper les QCM par cours
    const qcmByCourse = {};
    userData.qcm.forEach(qcm => {
        if (!qcmByCourse[qcm.courseId]) {
            qcmByCourse[qcm.courseId] = [];
        }
        qcmByCourse[qcm.courseId].push(qcm);
    });
    
    container.innerHTML = Object.entries(qcmByCourse).map(([courseId, qcmList]) => `
        <div class="qcm-card">
            <div class="qcm-header">
                <h3>${courseId}</h3>
                <span>${qcmList.length} questions</span>
            </div>
            <div class="qcm-actions">
                <button onclick="startQcm('${courseId}')" class="btn-primary">
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
    
    if (userData.flashcards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-layer-group"></i>
                <h3>Aucune flashcard disponible</h3>
                <p>Importez un cours pour générer des flashcards</p>
                <button onclick="showSection('import')" class="btn-primary">
                    Importer un cours
                </button>
            </div>
        `;
        return;
    }
    
    // Grouper les flashcards par cours
    const flashcardsByCourse = {};
    userData.flashcards.forEach(flashcard => {
        if (!flashcardsByCourse[flashcard.courseId]) {
            flashcardsByCourse[flashcard.courseId] = [];
        }
        flashcardsByCourse[flashcard.courseId].push(flashcard);
    });
    
    container.innerHTML = Object.entries(flashcardsByCourse).map(([courseId, flashcardsList]) => `
        <div class="flashcard-card">
            <div class="flashcard-header">
                <h3>${courseId}</h3>
                <span>${flashcardsList.length} cartes</span>
            </div>
            <div class="flashcard-actions">
                <button onclick="startFlashcards('${courseId}')" class="btn-primary">
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
    
    if (userData.matieres.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <h3>Aucune matière créée</h3>
                <p>Créez votre première matière pour organiser vos cours</p>
                <button onclick="showCreateMatiereModal()" class="btn-primary">
                    Créer une matière
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
    matiereSelect.innerHTML = '<option value="">Sélectionner une matière</option>' +
        userData.matieres.map(matiere => 
            `<option value="${matiere.id}">${matiere.name}</option>`
        ).join('');
    
    // Mettre à jour le sélecteur de cours
    courseSelect.innerHTML = '<option value="">Tous les cours</option>' +
        userData.courses.map(course => 
            `<option value="${course.id}">${course.name}</option>`
        ).join('');
}

// Mise à jour de la liste des résumés
function updateResumesList() {
    const container = document.getElementById('resumesList');
    
    if (userData.resumes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>Aucun résumé disponible</h3>
                <p>Importez un cours pour générer des résumés</p>
                <button onclick="showSection('import')" class="btn-primary">
                    Importer un cours
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
    // Progression globale
    const globalProgress = document.getElementById('globalProgress');
    const globalProgressText = document.getElementById('globalProgressText');
    const progress = Math.min(userData.stats.averageScore, 100);
    
    globalProgress.style.background = `conic-gradient(#2563eb 0deg, #2563eb ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`;
    globalProgressText.textContent = progress + '%';
    
    // Score moyen
    document.getElementById('averageScore').textContent = userData.stats.averageScore + '%';
}

// Fonctions utilitaires
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showMessage(message, isSuccess = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        background: ${isSuccess ? '#10b981' : '#ef4444'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Fonctions pour les matières
function showCreateMatiereModal() {
    document.getElementById('createMatiereModal').style.display = 'block';
    document.getElementById('matiereName').focus();
}

function closeCreateMatiereModal() {
    document.getElementById('createMatiereModal').style.display = 'none';
    document.getElementById('createMatiereForm').reset();
}

function createMatiere(name, color, description) {
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
    const course = userData.courses.find(c => c.id === courseId);
    if (!course || !course.pdfData) {
        showMessage('Aucun PDF disponible pour ce cours', false);
        return;
    }
    
    document.getElementById('pdfViewerTitle').textContent = course.name;
    document.getElementById('pdfViewerModal').style.display = 'block';
    
    // Convertir les données base64 en ArrayBuffer
    const pdfData = atob(course.pdfData.split(',')[1]);
    const pdfArray = new Uint8Array(pdfData.length);
    for (let i = 0; i < pdfData.length; i++) {
        pdfArray[i] = pdfData.charCodeAt(i);
    }
    
    // Charger le PDF
    pdfjsLib.getDocument({data: pdfArray}).promise.then(function(pdf) {
        pdfDoc = pdf;
        pageNum = 1;
        renderPage(pageNum);
    });
}

function renderPage(num) {
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
    
    document.getElementById('pageInfo').textContent = `Page ${num} sur ${pdfDoc.numPages}`;
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
    document.getElementById('pdfViewerModal').style.display = 'none';
    pdfDoc = null;
    pageNum = 1;
}

// Fonctions pour l'IA Chat
function sendMessage() {
    const input = document.getElementById('chatInput');
    const courseSelect = document.getElementById('courseSelect');
    const message = input.value.trim();
    const selectedCourse = courseSelect.value;
    
    if (!message) return;
    
    // Ajouter le message utilisateur
    addMessage(message, 'user');
    input.value = '';
    
    // Simuler la réponse de l'IA
    setTimeout(() => {
        const aiResponse = generateAIResponse(message, selectedCourse);
        addMessage(aiResponse, 'ai');
    }, 1000);
}

function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
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
    // Implémenter le démarrage du QCM
    showMessage('Fonctionnalité QCM en cours de développement', false);
}

function startFlashcards(courseId) {
    // Implémenter le démarrage des flashcards
    showMessage('Fonctionnalité Flashcards en cours de développement', false);
}

function closeQcmModal() {
    document.getElementById('qcmModal').style.display = 'none';
}

function closeFlashcardsModal() {
    document.getElementById('flashcardsModal').style.display = 'none';
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    window.location.href = 'index.html';
}

// Fonctions pour les matières
function viewMatiere(matiereId) {
    const matiere = userData.matieres.find(m => m.id === matiereId);
    if (matiere) {
        showMessage(`Affichage de la matière: ${matiere.name}`, true);
        // Ici on pourrait ouvrir un modal avec les détails de la matière
    }
}

function editMatiere(matiereId) {
    const matiere = userData.matieres.find(m => m.id === matiereId);
    if (matiere) {
        showMessage(`Édition de la matière: ${matiere.name}`, true);
        // Ici on pourrait ouvrir un modal d'édition
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

// Gestion du formulaire de création de matière
document.addEventListener('DOMContentLoaded', function() {
    const createMatiereForm = document.getElementById('createMatiereForm');
    const matiereColor = document.getElementById('matiereColor');
    const colorPreview = document.getElementById('colorPreview');
    
    if (createMatiereForm) {
        createMatiereForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('matiereName').value.trim();
            const color = matiereColor.value;
            const description = document.getElementById('matiereDescription').value.trim();
            
            if (!name) {
                showMessage('Veuillez saisir un nom de matière', false);
                return;
            }
            
            createMatiere(name, color, description);
            closeCreateMatiereModal();
        });
    }
    
    if (matiereColor && colorPreview) {
        matiereColor.addEventListener('change', function() {
            colorPreview.style.backgroundColor = this.value;
        });
        
        // Initialiser la couleur
        colorPreview.style.backgroundColor = matiereColor.value;
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
});

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