// Variables globales
let currentUser = null;
let userData = {
    courses: [],
    qcm: [],
    flashcards: [],
    resumes: [],
    stats: {
        totalCourses: 0,
        totalQcm: 0,
        totalFlashcards: 0,
        averageScore: 0
    }
};

// --- SUPABASE SESSION CHECK ---
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
  'https://xggnrnwyvqslxigblhih.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwd21lemtsaXZmcWVnc2tjemx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTczODksImV4cCI6MjA2OTUzMzM4OX0.ylmGI6yUfZtEtgIaS4FYQqAI6vJsIblAeYsob9ECXBY'
)

async function checkSupabaseSession() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'login.html'
    return
  }
  // Afficher les infos utilisateur dans la navbar
  const { user } = session
  if (user) {
    const userName = user.user_metadata?.full_name || user.email
    const userAvatar = user.user_metadata?.avatar_url
    if (document.getElementById('userName')) document.getElementById('userName').textContent = userName
    if (userAvatar && document.getElementById('userAvatar')) document.getElementById('userAvatar').innerHTML = `<img src='${userAvatar}' alt='Avatar' style='width:32px;height:32px;border-radius:50%;object-fit:cover;'>`
  }
}

// Appeler la vérification au chargement
if (window.location.pathname.endsWith('dashboard.html')) {
  checkSupabaseSession()
}
// --- FIN SUPABASE SESSION CHECK ---

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
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');
    if (!isPDF && !isImage) {
        showMessage('Veuillez sélectionner un fichier PDF ou une image', false);
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        showMessage('Le fichier est trop volumineux (max 10MB)', false);
        return;
    }
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const progressContainer = document.getElementById('importProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    if (isPDF) {
        progressText.textContent = 'Lecture du fichier PDF...';
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const typedarray = new Uint8Array(e.target.result);
                progressFill.style.width = '20%';
                progressText.textContent = 'Chargement du document...';
                let pdf;
                try {
                    pdf = await window['pdfjsLib'].getDocument({data: typedarray}).promise;
                } catch (err) {
                    throw new Error('Impossible de lire le PDF. Vérifiez que le fichier n\'est pas corrompu ou que le serveur autorise le chargement (CORS).');
                }
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    progressFill.style.width = (20 + (i/pdf.numPages)*60) + '%';
                    progressText.textContent = `Extraction du texte (page ${i}/${pdf.numPages})...`;
                    const page = await pdf.getPage(i);
                    const txt = await page.getTextContent();
                    textContent += txt.items.map(item => item.str).join(' ') + '\n';
                }
                progressFill.style.width = '90%';
                progressText.textContent = 'Finalisation de l\'import...';
                setTimeout(() => {
                    completeFileUpload(fileName, fileSize, textContent);
                }, 500);
            } catch (err) {
                progressContainer.style.display = 'none';
                showMessage('Erreur lors de la lecture du PDF : ' + err.message, false);
            }
        };
        reader.readAsArrayBuffer(file);
    } else if (isImage) {
        progressText.textContent = 'Lecture de l\'image...';
        const reader = new FileReader();
        reader.onload = function(e) {
            progressFill.style.width = '90%';
            progressText.textContent = 'Finalisation de l\'import...';
            setTimeout(() => {
                completeFileUpload(fileName, fileSize, '', e.target.result);
            }, 500);
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

// Modifie completeFileUpload pour accepter un paramètre imageData
function completeFileUpload(fileName, fileSize, fileContent, imageData) {
    const progressContainer = document.getElementById('importProgress');
    progressContainer.style.display = 'none';
    const qcmCount = parseInt(document.getElementById('qcmCount').value);
    const difficulty = document.getElementById('difficulty').value;
    const flashcardsCount = parseInt(document.getElementById('flashcardsCount').value);
    const course = {
        id: generateId(),
        name: fileName.replace(/\.(pdf|jpg|jpeg|png|gif)$/i, ''),
        fileName: fileName,
        fileSize: fileSize,
        date: new Date().toISOString(),
        qcmCount: qcmCount,
        flashcardsCount: flashcardsCount,
        difficulty: difficulty,
        analyzed: false,
        pdfText: fileContent || '',
        imageData: imageData || ''
    };
    userData.courses.push(course);
    saveUserData();
    updateDashboard();
    showMessage(`Cours "${course.name}" importé avec succès ! Cliquez sur "Analyser" pour générer les QCM et flashcards.`, true);
    setTimeout(() => {
        showSection('dashboard');
    }, 2000);
}

// Nouvelle fonction pour analyser un cours
function analyzeCourse(courseId) {
    const course = userData.courses.find(c => c.id === courseId);
    if (!course) {
        showMessage('Cours non trouvé', false);
        return;
    }
    
    if (course.analyzed) {
        showMessage('Ce cours a déjà été analysé', false);
        return;
    }
    
    // Afficher la progression d'analyse
    const progressContainer = document.getElementById('importProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressContainer.style.display = 'block';
    
    // Simuler l'analyse IA
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        if (progress < 25) {
            progressText.textContent = 'Analyse du contenu avec IA...';
        } else if (progress < 50) {
            progressText.textContent = 'Identification des concepts clés...';
        } else if (progress < 75) {
            progressText.textContent = 'Génération des questions QCM...';
        } else if (progress < 90) {
            progressText.textContent = 'Création des flashcards...';
        } else {
            progressText.textContent = 'Finalisation de l\'analyse...';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                completeAnalysis(courseId);
            }, 500);
        }
    }, 150);
}

// Finalisation de l'analyse
function completeAnalysis(courseId) {
    const progressContainer = document.getElementById('importProgress');
    progressContainer.style.display = 'none';
    
    const course = userData.courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Marquer le cours comme analysé
    course.analyzed = true;
    course.analysisDate = new Date().toISOString();
    
    // Générer les QCM et flashcards basés sur le contenu du cours (ici on simule, mais on pourrait utiliser course.pdfText)
    const qcm = generateSampleQCM(course.pdfText || course.name, course.qcmCount, course.difficulty);
    const flashcards = generateSampleFlashcards(course.pdfText || course.name, course.flashcardsCount);
    const resume = generateSampleResume(course.pdfText || course.name);
    
    // Ajouter aux données utilisateur
    userData.qcm.push(...qcm);
    userData.flashcards.push(...flashcards);
    userData.resumes.push(resume);
    
    // Mettre à jour les statistiques
    updateStats();
    saveUserData();
    
    // Mettre à jour l'affichage
    updateDashboard();
    
    showMessage(`Analyse terminée ! ${course.qcmCount} QCM et ${course.flashcardsCount} flashcards générés pour "${course.name}".`, true);
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
    updateQcmList();
    updateFlashcardsList();
    updateResumesList();
    updateStatsDisplay();
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
                ${course.imageData ? `<img src='${course.imageData}' alt='Aperçu' style='width:32px;height:32px;object-fit:cover;border-radius:6px;'>` : `<i class='fas fa-file-pdf'></i>`}
            </div>
            <div class="course-info">
                <h3>${course.name}</h3>
                <p>${course.fileSize} MB • ${formatDate(course.date)}</p>
                <div class="course-stats">
                    <span>${course.qcmCount} QCM</span>
                    <span>${course.flashcardsCount} Flashcards</span>
                </div>
                <div class="course-actions">
                    ${course.analyzed ? 
                        `<span class="status-badge analyzed">
                            <i class="fas fa-check-circle"></i>
                            Analysé
                        </span>` :
                        `<button onclick="analyzeCourse('${course.id}')" class="btn-analyze">
                            <i class="fas fa-brain"></i>
                            Analyser
                        </button>`
                    }
                </div>
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

// Fonctions pour les modals (à implémenter)
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

// Fonctions pour les paramètres et profil
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

function changeLanguage(language) {
    // Sauvegarder la préférence de langue
    localStorage.setItem('userLanguage', language);
    // Traductions principales
    const translations = {
        fr: {
            dashboard: 'Dashboard',
            import: 'Importer un cours',
            importDesc: "Importez vos PDF et laissez l'IA générer automatiquement des QCM et flashcards",
            qcm: 'QCM',
            qcmDesc: "Entraînez-vous avec les QCM générés par l'IA",
            flashcards: 'Flashcards',
            flashcardsDesc: 'Révisez efficacement avec les flashcards générées',
            resumes: 'Résumés',
            resumesDesc: 'Consultez les résumés générés par l\'IA',
            stats: 'Statistiques',
            statsDesc: 'Suivez vos progrès et vos performances',
            settings: 'Paramètres',
            settingsDesc: 'Personnalisez votre expérience StudyHub',
            profile: 'Profil',
            profileDesc: 'Gérez vos informations personnelles',
        },
        en: {
            dashboard: 'Dashboard',
            import: 'Import Course',
            importDesc: 'Import your PDFs and let AI generate QCM and flashcards',
            qcm: 'MCQ',
            qcmDesc: 'Practice with AI-generated MCQs',
            flashcards: 'Flashcards',
            flashcardsDesc: 'Efficiently review with generated flashcards',
            resumes: 'Summaries',
            resumesDesc: 'View AI-generated summaries',
            stats: 'Statistics',
            statsDesc: 'Track your progress and performance',
            settings: 'Settings',
            settingsDesc: 'Customize your StudyHub experience',
            profile: 'Profile',
            profileDesc: 'Manage your personal information',
        },
        es: {
            dashboard: 'Panel',
            import: 'Importar curso',
            importDesc: 'Importa tus PDF y deja que la IA genere QCM y flashcards',
            qcm: 'QCM',
            qcmDesc: 'Entrénate con QCM generados por IA',
            flashcards: 'Flashcards',
            flashcardsDesc: 'Revisa eficazmente con flashcards generadas',
            resumes: 'Resúmenes',
            resumesDesc: 'Consulta los resúmenes generados por IA',
            stats: 'Estadísticas',
            statsDesc: 'Sigue tu progreso y rendimiento',
            settings: 'Ajustes',
            settingsDesc: 'Personaliza tu experiencia StudyHub',
            profile: 'Perfil',
            profileDesc: 'Gestiona tu información personal',
        },
        de: {
            dashboard: 'Dashboard',
            import: 'Kurs importieren',
            importDesc: 'Importieren Sie Ihre PDFs und lassen Sie die KI QCM und Karteikarten generieren',
            qcm: 'QCM',
            qcmDesc: 'Üben Sie mit KI-generierten QCMs',
            flashcards: 'Karteikarten',
            flashcardsDesc: 'Effizient mit generierten Karteikarten lernen',
            resumes: 'Zusammenfassungen',
            resumesDesc: 'Von der KI generierte Zusammenfassungen ansehen',
            stats: 'Statistiken',
            statsDesc: 'Verfolgen Sie Ihren Fortschritt und Ihre Leistung',
            settings: 'Einstellungen',
            settingsDesc: 'Passen Sie Ihre StudyHub-Erfahrung an',
            profile: 'Profil',
            profileDesc: 'Verwalten Sie Ihre persönlichen Informationen',
        }
    };
    const t = translations[language] || translations.fr;
    // Titres principaux
    const sectionTitles = [
        {id: 'dashboard', title: t.dashboard},
        {id: 'import', title: t.import},
        {id: 'qcm', title: t.qcm},
        {id: 'flashcards', title: t.flashcards},
        {id: 'resumes', title: t.resumes},
        {id: 'statistiques', title: t.stats},
        {id: 'parametres', title: t.settings},
        {id: 'profil', title: t.profile},
    ];
    sectionTitles.forEach(s => {
        const el = document.querySelector(`#${s.id} .section-header h1`);
        if (el) el.textContent = s.title;
    });
    // Sous-titres/descriptions
    const descs = [
        {id: 'dashboard', desc: ''},
        {id: 'import', desc: t.importDesc},
        {id: 'qcm', desc: t.qcmDesc},
        {id: 'flashcards', desc: t.flashcardsDesc},
        {id: 'resumes', desc: t.resumesDesc},
        {id: 'statistiques', desc: t.statsDesc},
        {id: 'parametres', desc: t.settingsDesc},
        {id: 'profil', desc: t.profileDesc},
    ];
    descs.forEach(s => {
        const el = document.querySelector(`#${s.id} .section-header p`);
        if (el && s.desc) el.textContent = s.desc;
    });
    // Navigation
    const navMap = {
        dashboard: t.dashboard,
        import: t.import,
        qcm: t.qcm,
        flashcards: t.flashcards,
        resumes: t.resumes,
        statistiques: t.stats
    };
    Object.keys(navMap).forEach(id => {
        const nav = document.querySelector(`.nav-link[href="#${id}"]`);
        if (nav) nav.childNodes[2].textContent = navMap[id];
    });
    // Menu utilisateur
    const paramLink = document.querySelector('.dropdown-menu a[href="#parametres"]');
    if (paramLink) paramLink.childNodes[2].textContent = t.settings;
    const profilLink = document.querySelector('.dropdown-menu a[href="#profil"]');
    if (profilLink) profilLink.childNodes[2].textContent = t.profile;
    // Message
    showMessage(`Langue changée vers ${language === 'fr' ? 'Français' : language === 'en' ? 'English' : language === 'es' ? 'Español' : 'Deutsch'}`, true);
}

function changeTheme(theme) {
    // Sauvegarder la préférence de thème
    localStorage.setItem('userTheme', theme);
    
    // Appliquer le thème
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    
    showMessage(`Thème changé vers ${theme === 'light' ? 'Clair' : 'Sombre'}`, true);
}

function changeAvatar() {
    // Créer un input file caché
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Mettre à jour l'avatar dans le profil
                const profileAvatar = document.getElementById('profileAvatar');
                profileAvatar.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                
                // Mettre à jour l'avatar dans la navbar
                const userAvatar = document.getElementById('userAvatar');
                userAvatar.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                
                // Sauvegarder l'avatar
                localStorage.setItem('userAvatar', e.target.result);
                
                showMessage('Avatar mis à jour avec succès !', true);
            };
            reader.readAsDataURL(file);
        }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

// Charger les préférences utilisateur
function loadUserPreferences() {
    // Charger la langue
    const language = localStorage.getItem('userLanguage') || 'fr';
    document.getElementById('languageSelect').value = language;
    
    // Charger le thème
    const theme = localStorage.getItem('userTheme') || 'light';
    document.querySelector(`input[name="theme"][value="${theme}"]`).checked = true;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    
    // Charger l'avatar
    const avatar = localStorage.getItem('userAvatar');
    if (avatar) {
        const userAvatar = document.getElementById('userAvatar');
        const profileAvatar = document.getElementById('profileAvatar');
        if (userAvatar) userAvatar.innerHTML = `<img src="${avatar}" alt="Avatar">`;
        if (profileAvatar) profileAvatar.innerHTML = `<img src="${avatar}" alt="Avatar">`;
    }
    
    // Charger les notifications
    const emailNotifications = localStorage.getItem('emailNotifications') !== 'false';
    const pushNotifications = localStorage.getItem('pushNotifications') !== 'false';
    const reminderNotifications = localStorage.getItem('reminderNotifications') === 'true';
    
    document.getElementById('emailNotifications').checked = emailNotifications;
    document.getElementById('pushNotifications').checked = pushNotifications;
    document.getElementById('reminderNotifications').checked = reminderNotifications;
}

// Gérer les changements de notifications
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les event listeners pour les notifications
    const emailNotif = document.getElementById('emailNotifications');
    const pushNotif = document.getElementById('pushNotifications');
    const reminderNotif = document.getElementById('reminderNotifications');
    
    if (emailNotif) {
        emailNotif.addEventListener('change', function() {
            localStorage.setItem('emailNotifications', this.checked);
        });
    }
    
    if (pushNotif) {
        pushNotif.addEventListener('change', function() {
            localStorage.setItem('pushNotifications', this.checked);
        });
    }
    
    if (reminderNotif) {
        reminderNotif.addEventListener('change', function() {
            localStorage.setItem('reminderNotifications', this.checked);
        });
    }
    
    // Gérer le formulaire de profil
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('profileName').value;
            const bio = document.getElementById('profileBio').value;
            
            // Sauvegarder les informations du profil
            localStorage.setItem('userDisplayName', name);
            localStorage.setItem('userBio', bio);
            
            // Mettre à jour l'affichage
            document.getElementById('userName').textContent = name || currentUser.email;
            
            showMessage('Profil mis à jour avec succès !', true);
        });
    }
    
    // Fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('userDropdown');
        const settingsBtn = document.querySelector('.btn-settings');
        
        if (dropdown && !dropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Mettre à jour la fonction checkAuth pour charger les préférences
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('userToken');
    
    if (!user || !token) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(user);
    
    // Charger les informations du profil
    const displayName = localStorage.getItem('userDisplayName') || currentUser.displayName || currentUser.email;
    const bio = localStorage.getItem('userBio') || '';
    
    document.getElementById('userName').textContent = displayName;
    
    // Mettre à jour le formulaire de profil
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileBio = document.getElementById('profileBio');
    
    if (profileName) profileName.value = displayName;
    if (profileEmail) profileEmail.value = currentUser.email;
    if (profileBio) profileBio.value = bio;
    
    // Charger les préférences utilisateur
    loadUserPreferences();
}

// Export des fonctions pour utilisation globale
window.showSection = showSection;
window.logout = logout;
window.startQcm = startQcm;
window.startFlashcards = startFlashcards;
window.closeQcmModal = closeQcmModal;
window.closeFlashcardsModal = closeFlashcardsModal;
window.toggleUserMenu = toggleUserMenu;
window.changeLanguage = changeLanguage;
window.changeTheme = changeTheme;
window.changeAvatar = changeAvatar;
window.analyzeCourse = analyzeCourse;