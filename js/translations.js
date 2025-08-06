// Système de traductions
const translations = {
    fr: {
        // Navigation
        dashboard: "Dashboard",
        subjects: "Matières",
        import: "Importer",
        qcm: "QCM",
        flashcards: "Flashcards",
        summaries: "Résumés",
        ai_chat: "IA Chat",
        statistics: "Statistiques",
        
        // Dashboard
        welcome_message: "Bienvenue sur StudyHub",
        welcome_subtitle: "Votre espace de révision intelligente",
        imported_courses: "Cours importés",
        generated_qcm: "QCM générés",
        average_score: "Score moyen",
        quick_actions: "Actions rapides",
        manage_subjects: "Gérer les matières",
        import_course: "Importer un cours",
        start_qcm: "Commencer un QCM",
        ask_ai: "Poser une question à l'IA",
        recent_courses: "Cours récents",
        no_courses: "Aucun cours importé",
        start_import: "Commencez par importer votre premier cours",
        
        // Matières
        subject_management: "Gestion des matières",
        subject_description: "Organisez vos cours par matières et personnalisez votre espace",
        create_subject: "Créer une matière",
        no_subjects: "Aucune matière créée",
        create_first_subject: "Créez votre première matière pour organiser vos cours",
        subject_name: "Nom de la matière",
        color: "Couleur",
        description_optional: "Description (optionnel)",
        create_new_subject: "Créer une nouvelle matière",
        
        // Import
        import_description: "Importez vos PDF et laissez l'IA générer automatiquement des QCM et flashcards",
        drag_drop_pdf: "Glissez-déposez votre PDF ici",
        or_click_select: "ou cliquez pour sélectionner un fichier",
        choose_file: "Choisir un fichier",
        generation_options: "Options de génération",
        subject: "Matière",
        select_subject: "Sélectionner une matière",
        qcm_count: "Nombre de QCM",
        difficulty_level: "Niveau de difficulté",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
        flashcards_count: "Nombre de flashcards",
        analyzing_document: "Analyse du document...",
        
        // QCM
        qcm_description: "Entraînez-vous avec les QCM générés par l'IA",
        no_qcm: "Aucun QCM disponible",
        import_for_qcm: "Importez un cours pour générer des QCM",
        
        // Flashcards
        flashcards_description: "Révisez efficacement avec les flashcards générées",
        no_flashcards: "Aucune flashcard disponible",
        import_for_flashcards: "Importez un cours pour générer des flashcards",
        
        // Résumés
        summaries_description: "Consultez les résumés générés par l'IA",
        no_summaries: "Aucun résumé disponible",
        import_for_summaries: "Importez un cours pour générer des résumés",
        
        // IA Chat
        ai_assistant: "Assistant IA",
        ai_description: "Posez vos questions à l'IA sur vos cours importés",
        ai_welcome: "Bonjour ! Je suis votre assistant IA. Posez-moi des questions sur vos cours importés et je vous aiderai à mieux comprendre les concepts.",
        all_courses: "Tous les cours",
        ask_question: "Posez votre question...",
        
        // Statistiques
        statistics_description: "Suivez vos progrès et vos performances",
        global_progress: "Progression globale",
        average_qcm_score: "Score moyen QCM",
        subject_details: "Détails par matière",
        no_data: "Aucune donnée disponible",
        start_studying: "Commencez à réviser pour voir vos statistiques",
        
        // Profil
        profile_settings: "Paramètres du profil",
        personal_info: "Informations personnelles",
        first_name: "Prénom",
        last_name: "Nom",
        email: "Email",
        avatar: "Avatar",
        select_avatar: "Sélectionner un avatar",
        language: "Langue",
        select_language: "Sélectionner la langue",
        french: "Français",
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        portuguese: "Português",
        security: "Sécurité",
        change_password: "Changer le mot de passe",
        save_changes: "Sauvegarder",
        current_password: "Mot de passe actuel",
        new_password: "Nouveau mot de passe",
        confirm_new_password: "Confirmer le nouveau mot de passe",
        update_password: "Mettre à jour",
        
        // Modals
        pdf_viewer: "Visionneur PDF",
        previous: "Précédent",
        next: "Suivant",
        
        // Messages
        success: "Succès",
        error: "Erreur",
        loading: "Chargement..."
    },
    
    en: {
        // Navigation
        dashboard: "Dashboard",
        subjects: "Subjects",
        import: "Import",
        qcm: "QCM",
        flashcards: "Flashcards",
        summaries: "Summaries",
        ai_chat: "AI Chat",
        statistics: "Statistics",
        
        // Dashboard
        welcome_message: "Welcome to StudyHub",
        welcome_subtitle: "Your intelligent revision space",
        imported_courses: "Imported courses",
        generated_qcm: "Generated QCM",
        average_score: "Average score",
        quick_actions: "Quick actions",
        manage_subjects: "Manage subjects",
        import_course: "Import a course",
        start_qcm: "Start a QCM",
        ask_ai: "Ask AI a question",
        recent_courses: "Recent courses",
        no_courses: "No imported courses",
        start_import: "Start by importing your first course",
        
        // Matières
        subject_management: "Subject management",
        subject_description: "Organize your courses by subjects and customize your space",
        create_subject: "Create a subject",
        no_subjects: "No subjects created",
        create_first_subject: "Create your first subject to organize your courses",
        subject_name: "Subject name",
        color: "Color",
        description_optional: "Description (optional)",
        create_new_subject: "Create a new subject",
        
        // Import
        import_description: "Import your PDFs and let AI automatically generate QCM and flashcards",
        drag_drop_pdf: "Drag and drop your PDF here",
        or_click_select: "or click to select a file",
        choose_file: "Choose a file",
        generation_options: "Generation options",
        subject: "Subject",
        select_subject: "Select a subject",
        qcm_count: "Number of QCM",
        difficulty_level: "Difficulty level",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        flashcards_count: "Number of flashcards",
        analyzing_document: "Analyzing document...",
        
        // QCM
        qcm_description: "Train with AI-generated QCM",
        no_qcm: "No QCM available",
        import_for_qcm: "Import a course to generate QCM",
        
        // Flashcards
        flashcards_description: "Review efficiently with generated flashcards",
        no_flashcards: "No flashcards available",
        import_for_flashcards: "Import a course to generate flashcards",
        
        // Résumés
        summaries_description: "Consult AI-generated summaries",
        no_summaries: "No summaries available",
        import_for_summaries: "Import a course to generate summaries",
        
        // IA Chat
        ai_assistant: "AI Assistant",
        ai_description: "Ask AI questions about your imported courses",
        ai_welcome: "Hello! I'm your AI assistant. Ask me questions about your imported courses and I'll help you better understand the concepts.",
        all_courses: "All courses",
        ask_question: "Ask your question...",
        
        // Statistiques
        statistics_description: "Track your progress and performance",
        global_progress: "Global progress",
        average_qcm_score: "Average QCM score",
        subject_details: "Details by subject",
        no_data: "No data available",
        start_studying: "Start studying to see your statistics",
        
        // Profil
        profile_settings: "Profile settings",
        personal_info: "Personal information",
        first_name: "First name",
        last_name: "Last name",
        email: "Email",
        avatar: "Avatar",
        select_avatar: "Select an avatar",
        language: "Language",
        select_language: "Select language",
        french: "Français",
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        portuguese: "Português",
        security: "Security",
        change_password: "Change password",
        save_changes: "Save changes",
        current_password: "Current password",
        new_password: "New password",
        confirm_new_password: "Confirm new password",
        update_password: "Update",
        
        // Modals
        pdf_viewer: "PDF Viewer",
        previous: "Previous",
        next: "Next",
        
        // Messages
        success: "Success",
        error: "Error",
        loading: "Loading..."
    },
    
    de: {
        // Navigation
        dashboard: "Dashboard",
        subjects: "Fächer",
        import: "Importieren",
        qcm: "QCM",
        flashcards: "Karteikarten",
        summaries: "Zusammenfassungen",
        ai_chat: "KI-Chat",
        statistics: "Statistiken",
        
        // Dashboard
        welcome_message: "Willkommen bei StudyHub",
        welcome_subtitle: "Ihr intelligenter Lernraum",
        imported_courses: "Importierte Kurse",
        generated_qcm: "Generierte QCM",
        average_score: "Durchschnittsnote",
        quick_actions: "Schnellaktionen",
        manage_subjects: "Fächer verwalten",
        import_course: "Kurs importieren",
        start_qcm: "QCM starten",
        ask_ai: "KI eine Frage stellen",
        recent_courses: "Neueste Kurse",
        no_courses: "Keine importierten Kurse",
        start_import: "Beginnen Sie mit dem Importieren Ihres ersten Kurses",
        
        // Matières
        subject_management: "Fachverwaltung",
        subject_description: "Organisieren Sie Ihre Kurse nach Fächern und passen Sie Ihren Raum an",
        create_subject: "Fach erstellen",
        no_subjects: "Keine Fächer erstellt",
        create_first_subject: "Erstellen Sie Ihr erstes Fach, um Ihre Kurse zu organisieren",
        subject_name: "Fachname",
        color: "Farbe",
        description_optional: "Beschreibung (optional)",
        create_new_subject: "Neues Fach erstellen",
        
        // Import
        import_description: "Importieren Sie Ihre PDFs und lassen Sie die KI automatisch QCM und Karteikarten generieren",
        drag_drop_pdf: "Ziehen Sie Ihre PDF hierher",
        or_click_select: "oder klicken Sie, um eine Datei auszuwählen",
        choose_file: "Datei auswählen",
        generation_options: "Generierungsoptionen",
        subject: "Fach",
        select_subject: "Fach auswählen",
        qcm_count: "Anzahl der QCM",
        difficulty_level: "Schwierigkeitsgrad",
        easy: "Einfach",
        medium: "Mittel",
        hard: "Schwer",
        flashcards_count: "Anzahl der Karteikarten",
        analyzing_document: "Dokument wird analysiert...",
        
        // QCM
        qcm_description: "Trainieren Sie mit KI-generierten QCM",
        no_qcm: "Keine QCM verfügbar",
        import_for_qcm: "Importieren Sie einen Kurs, um QCM zu generieren",
        
        // Flashcards
        flashcards_description: "Wiederholen Sie effizient mit generierten Karteikarten",
        no_flashcards: "Keine Karteikarten verfügbar",
        import_for_flashcards: "Importieren Sie einen Kurs, um Karteikarten zu generieren",
        
        // Résumés
        summaries_description: "Konsultieren Sie KI-generierte Zusammenfassungen",
        no_summaries: "Keine Zusammenfassungen verfügbar",
        import_for_summaries: "Importieren Sie einen Kurs, um Zusammenfassungen zu generieren",
        
        // IA Chat
        ai_assistant: "KI-Assistent",
        ai_description: "Stellen Sie der KI Fragen zu Ihren importierten Kursen",
        ai_welcome: "Hallo! Ich bin Ihr KI-Assistent. Stellen Sie mir Fragen zu Ihren importierten Kursen und ich helfe Ihnen dabei, die Konzepte besser zu verstehen.",
        all_courses: "Alle Kurse",
        ask_question: "Stellen Sie Ihre Frage...",
        
        // Statistiques
        statistics_description: "Verfolgen Sie Ihren Fortschritt und Ihre Leistung",
        global_progress: "Globaler Fortschritt",
        average_qcm_score: "Durchschnittliche QCM-Note",
        subject_details: "Details nach Fach",
        no_data: "Keine Daten verfügbar",
        start_studying: "Beginnen Sie mit dem Lernen, um Ihre Statistiken zu sehen",
        
        // Profil
        profile_settings: "Profileinstellungen",
        personal_info: "Persönliche Informationen",
        first_name: "Vorname",
        last_name: "Nachname",
        email: "E-Mail",
        avatar: "Avatar",
        select_avatar: "Avatar auswählen",
        language: "Sprache",
        select_language: "Sprache auswählen",
        french: "Français",
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        portuguese: "Português",
        security: "Sicherheit",
        change_password: "Passwort ändern",
        save_changes: "Änderungen speichern",
        current_password: "Aktuelles Passwort",
        new_password: "Neues Passwort",
        confirm_new_password: "Neues Passwort bestätigen",
        update_password: "Aktualisieren",
        
        // Modals
        pdf_viewer: "PDF-Viewer",
        previous: "Zurück",
        next: "Weiter",
        
        // Messages
        success: "Erfolg",
        error: "Fehler",
        loading: "Laden..."
    },
    
    es: {
        // Navigation
        dashboard: "Panel",
        subjects: "Materias",
        import: "Importar",
        qcm: "QCM",
        flashcards: "Tarjetas",
        summaries: "Resúmenes",
        ai_chat: "Chat IA",
        statistics: "Estadísticas",
        
        // Dashboard
        welcome_message: "Bienvenido a StudyHub",
        welcome_subtitle: "Tu espacio de revisión inteligente",
        imported_courses: "Cursos importados",
        generated_qcm: "QCM generados",
        average_score: "Puntuación media",
        quick_actions: "Acciones rápidas",
        manage_subjects: "Gestionar materias",
        import_course: "Importar un curso",
        start_qcm: "Comenzar un QCM",
        ask_ai: "Hacer una pregunta a la IA",
        recent_courses: "Cursos recientes",
        no_courses: "Ningún curso importado",
        start_import: "Comience importando su primer curso",
        
        // Matières
        subject_management: "Gestión de materias",
        subject_description: "Organice sus cursos por materias y personalice su espacio",
        create_subject: "Crear una materia",
        no_subjects: "Ninguna materia creada",
        create_first_subject: "Cree su primera materia para organizar sus cursos",
        subject_name: "Nombre de la materia",
        color: "Color",
        description_optional: "Descripción (opcional)",
        create_new_subject: "Crear una nueva materia",
        
        // Import
        import_description: "Importe sus PDF y deje que la IA genere automáticamente QCM y tarjetas",
        drag_drop_pdf: "Arrastre y suelte su PDF aquí",
        or_click_select: "o haga clic para seleccionar un archivo",
        choose_file: "Elegir archivo",
        generation_options: "Opciones de generación",
        subject: "Materia",
        select_subject: "Seleccionar una materia",
        qcm_count: "Número de QCM",
        difficulty_level: "Nivel de dificultad",
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        flashcards_count: "Número de tarjetas",
        analyzing_document: "Analizando documento...",
        
        // QCM
        qcm_description: "Entrene con QCM generados por IA",
        no_qcm: "Ningún QCM disponible",
        import_for_qcm: "Importe un curso para generar QCM",
        
        // Flashcards
        flashcards_description: "Revise eficientemente con tarjetas generadas",
        no_flashcards: "Ninguna tarjeta disponible",
        import_for_flashcards: "Importe un curso para generar tarjetas",
        
        // Résumés
        summaries_description: "Consulte resúmenes generados por IA",
        no_summaries: "Ningún resumen disponible",
        import_for_summaries: "Importe un curso para generar resúmenes",
        
        // IA Chat
        ai_assistant: "Asistente IA",
        ai_description: "Haga preguntas a la IA sobre sus cursos importados",
        ai_welcome: "¡Hola! Soy su asistente IA. Hágame preguntas sobre sus cursos importados y le ayudaré a entender mejor los conceptos.",
        all_courses: "Todos los cursos",
        ask_question: "Haga su pregunta...",
        
        // Statistiques
        statistics_description: "Siga su progreso y rendimiento",
        global_progress: "Progreso global",
        average_qcm_score: "Puntuación media QCM",
        subject_details: "Detalles por materia",
        no_data: "No hay datos disponibles",
        start_studying: "Comience a estudiar para ver sus estadísticas",
        
        // Profil
        profile_settings: "Configuración del perfil",
        personal_info: "Información personal",
        first_name: "Nombre",
        last_name: "Apellido",
        email: "Correo electrónico",
        avatar: "Avatar",
        select_avatar: "Seleccionar avatar",
        language: "Idioma",
        select_language: "Seleccionar idioma",
        french: "Français",
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        portuguese: "Português",
        security: "Seguridad",
        change_password: "Cambiar contraseña",
        save_changes: "Guardar cambios",
        current_password: "Contraseña actual",
        new_password: "Nueva contraseña",
        confirm_new_password: "Confirmar nueva contraseña",
        update_password: "Actualizar",
        
        // Modals
        pdf_viewer: "Visor PDF",
        previous: "Anterior",
        next: "Siguiente",
        
        // Messages
        success: "Éxito",
        error: "Error",
        loading: "Cargando..."
    },
    
    pt: {
        // Navigation
        dashboard: "Painel",
        subjects: "Matérias",
        import: "Importar",
        qcm: "QCM",
        flashcards: "Cartões",
        summaries: "Resumos",
        ai_chat: "Chat IA",
        statistics: "Estatísticas",
        
        // Dashboard
        welcome_message: "Bem-vindo ao StudyHub",
        welcome_subtitle: "Seu espaço de revisão inteligente",
        imported_courses: "Cursos importados",
        generated_qcm: "QCM gerados",
        average_score: "Pontuação média",
        quick_actions: "Ações rápidas",
        manage_subjects: "Gerenciar matérias",
        import_course: "Importar um curso",
        start_qcm: "Começar um QCM",
        ask_ai: "Fazer uma pergunta à IA",
        recent_courses: "Cursos recentes",
        no_courses: "Nenhum curso importado",
        start_import: "Comece importando seu primeiro curso",
        
        // Matières
        subject_management: "Gerenciamento de matérias",
        subject_description: "Organize seus cursos por matérias e personalize seu espaço",
        create_subject: "Criar uma matéria",
        no_subjects: "Nenhuma matéria criada",
        create_first_subject: "Crie sua primeira matéria para organizar seus cursos",
        subject_name: "Nome da matéria",
        color: "Cor",
        description_optional: "Descrição (opcional)",
        create_new_subject: "Criar uma nova matéria",
        
        // Import
        import_description: "Importe seus PDFs e deixe a IA gerar automaticamente QCM e cartões",
        drag_drop_pdf: "Arraste e solte seu PDF aqui",
        or_click_select: "ou clique para selecionar um arquivo",
        choose_file: "Escolher arquivo",
        generation_options: "Opções de geração",
        subject: "Matéria",
        select_subject: "Selecionar uma matéria",
        qcm_count: "Número de QCM",
        difficulty_level: "Nível de dificuldade",
        easy: "Fácil",
        medium: "Médio",
        hard: "Difícil",
        flashcards_count: "Número de cartões",
        analyzing_document: "Analisando documento...",
        
        // QCM
        qcm_description: "Treine com QCM gerados por IA",
        no_qcm: "Nenhum QCM disponível",
        import_for_qcm: "Importe um curso para gerar QCM",
        
        // Flashcards
        flashcards_description: "Revise eficientemente com cartões gerados",
        no_flashcards: "Nenhum cartão disponível",
        import_for_flashcards: "Importe um curso para gerar cartões",
        
        // Résumés
        summaries_description: "Consulte resumos gerados por IA",
        no_summaries: "Nenhum resumo disponível",
        import_for_summaries: "Importe um curso para gerar resumos",
        
        // IA Chat
        ai_assistant: "Assistente IA",
        ai_description: "Faça perguntas à IA sobre seus cursos importados",
        ai_welcome: "Olá! Sou seu assistente IA. Faça-me perguntas sobre seus cursos importados e eu o ajudarei a entender melhor os conceitos.",
        all_courses: "Todos os cursos",
        ask_question: "Faça sua pergunta...",
        
        // Statistiques
        statistics_description: "Acompanhe seu progresso e desempenho",
        global_progress: "Progresso global",
        average_qcm_score: "Pontuação média QCM",
        subject_details: "Detalhes por matéria",
        no_data: "Nenhum dado disponível",
        start_studying: "Comece a estudar para ver suas estatísticas",
        
        // Profil
        profile_settings: "Configurações do perfil",
        personal_info: "Informações pessoais",
        first_name: "Nome",
        last_name: "Sobrenome",
        email: "E-mail",
        avatar: "Avatar",
        select_avatar: "Selecionar avatar",
        language: "Idioma",
        select_language: "Selecionar idioma",
        french: "Français",
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        portuguese: "Português",
        security: "Segurança",
        change_password: "Alterar senha",
        save_changes: "Salvar alterações",
        current_password: "Senha atual",
        new_password: "Nova senha",
        confirm_new_password: "Confirmar nova senha",
        update_password: "Atualizar",
        
        // Modals
        pdf_viewer: "Visualizador PDF",
        previous: "Anterior",
        next: "Próximo",
        
        // Messages
        success: "Sucesso",
        error: "Erro",
        loading: "Carregando..."
    }
};

// Langue actuelle
let currentLanguage = localStorage.getItem('language') || 'fr';

// Fonction pour changer de langue
function changeLanguage(lang) {
    console.log('Changement de langue vers:', lang);
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
}

// Fonction pour mettre à jour les traductions
function updateTranslations() {
    console.log('Mise à jour des traductions pour:', currentLanguage);
    
    // Mettre à jour les éléments avec data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Mettre à jour les placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Fonction pour obtenir une traduction
function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : key;
}

// Initialiser les traductions au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation des traductions...');
    updateTranslations();
});

// Exporter les fonctions pour utilisation globale
window.changeLanguage = changeLanguage;
window.updateTranslations = updateTranslations;
window.getTranslation = getTranslation;