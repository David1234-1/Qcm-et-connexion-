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
        
        // PDF Viewer
        pdf_viewer: "Visionneur PDF",
        previous: "Précédent",
        next: "Suivant"
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
        import_course: "Import course",
        start_qcm: "Start QCM",
        ask_ai: "Ask AI",
        recent_courses: "Recent courses",
        no_courses: "No imported courses",
        start_import: "Start by importing your first course",
        
        // Subjects
        subject_management: "Subject management",
        subject_description: "Organize your courses by subjects and customize your space",
        create_subject: "Create subject",
        no_subjects: "No subjects created",
        create_first_subject: "Create your first subject to organize your courses",
        subject_name: "Subject name",
        color: "Color",
        description_optional: "Description (optional)",
        create_new_subject: "Create new subject",
        
        // Import
        import_description: "Import your PDFs and let AI automatically generate QCM and flashcards",
        drag_drop_pdf: "Drag and drop your PDF here",
        or_click_select: "or click to select a file",
        choose_file: "Choose file",
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
        
        // Summaries
        summaries_description: "View AI-generated summaries",
        no_summaries: "No summaries available",
        import_for_summaries: "Import a course to generate summaries",
        
        // AI Chat
        ai_assistant: "AI Assistant",
        ai_description: "Ask AI questions about your imported courses",
        ai_welcome: "Hello! I'm your AI assistant. Ask me questions about your imported courses and I'll help you better understand the concepts.",
        all_courses: "All courses",
        ask_question: "Ask your question...",
        
        // Statistics
        statistics_description: "Track your progress and performance",
        global_progress: "Global progress",
        average_qcm_score: "Average QCM score",
        subject_details: "Subject details",
        no_data: "No data available",
        start_studying: "Start studying to see your statistics",
        
        // Profile
        profile_settings: "Profile settings",
        personal_info: "Personal information",
        first_name: "First name",
        last_name: "Last name",
        email: "Email",
        avatar: "Avatar",
        select_avatar: "Select avatar",
        language: "Language",
        select_language: "Select language",
        french: "French",
        english: "English",
        german: "German",
        spanish: "Spanish",
        portuguese: "Portuguese",
        security: "Security",
        change_password: "Change password",
        save_changes: "Save changes",
        current_password: "Current password",
        new_password: "New password",
        confirm_new_password: "Confirm new password",
        update_password: "Update",
        
        // PDF Viewer
        pdf_viewer: "PDF Viewer",
        previous: "Previous",
        next: "Next"
    },
    
    de: {
        // Navigation
        dashboard: "Dashboard",
        subjects: "Fächer",
        import: "Importieren",
        qcm: "MCQ",
        flashcards: "Karteikarten",
        summaries: "Zusammenfassungen",
        ai_chat: "KI-Chat",
        statistics: "Statistiken",
        
        // Dashboard
        welcome_message: "Willkommen bei StudyHub",
        welcome_subtitle: "Ihr intelligenter Lernraum",
        imported_courses: "Importierte Kurse",
        generated_qcm: "Generierte MCQ",
        average_score: "Durchschnittsnote",
        quick_actions: "Schnellaktionen",
        manage_subjects: "Fächer verwalten",
        import_course: "Kurs importieren",
        start_qcm: "MCQ starten",
        ask_ai: "KI fragen",
        recent_courses: "Aktuelle Kurse",
        no_courses: "Keine importierten Kurse",
        start_import: "Beginnen Sie mit dem Import Ihres ersten Kurses",
        
        // Subjects
        subject_management: "Fachverwaltung",
        subject_description: "Organisieren Sie Ihre Kurse nach Fächern und passen Sie Ihren Bereich an",
        create_subject: "Fach erstellen",
        no_subjects: "Keine Fächer erstellt",
        create_first_subject: "Erstellen Sie Ihr erstes Fach, um Ihre Kurse zu organisieren",
        subject_name: "Fachname",
        color: "Farbe",
        description_optional: "Beschreibung (optional)",
        create_new_subject: "Neues Fach erstellen",
        
        // Import
        import_description: "Importieren Sie Ihre PDFs und lassen Sie die KI automatisch MCQ und Karteikarten generieren",
        drag_drop_pdf: "Ziehen Sie Ihre PDF hierher",
        or_click_select: "oder klicken Sie, um eine Datei auszuwählen",
        choose_file: "Datei auswählen",
        generation_options: "Generierungsoptionen",
        subject: "Fach",
        select_subject: "Fach auswählen",
        qcm_count: "Anzahl der MCQ",
        difficulty_level: "Schwierigkeitsgrad",
        easy: "Einfach",
        medium: "Mittel",
        hard: "Schwer",
        flashcards_count: "Anzahl der Karteikarten",
        analyzing_document: "Dokument wird analysiert...",
        
        // QCM
        qcm_description: "Trainieren Sie mit KI-generierten MCQ",
        no_qcm: "Keine MCQ verfügbar",
        import_for_qcm: "Importieren Sie einen Kurs, um MCQ zu generieren",
        
        // Flashcards
        flashcards_description: "Wiederholen Sie effizient mit generierten Karteikarten",
        no_flashcards: "Keine Karteikarten verfügbar",
        import_for_flashcards: "Importieren Sie einen Kurs, um Karteikarten zu generieren",
        
        // Summaries
        summaries_description: "Betrachten Sie KI-generierte Zusammenfassungen",
        no_summaries: "Keine Zusammenfassungen verfügbar",
        import_for_summaries: "Importieren Sie einen Kurs, um Zusammenfassungen zu generieren",
        
        // AI Chat
        ai_assistant: "KI-Assistent",
        ai_description: "Stellen Sie der KI Fragen zu Ihren importierten Kursen",
        ai_welcome: "Hallo! Ich bin Ihr KI-Assistent. Stellen Sie mir Fragen zu Ihren importierten Kursen und ich helfe Ihnen, die Konzepte besser zu verstehen.",
        all_courses: "Alle Kurse",
        ask_question: "Stellen Sie Ihre Frage...",
        
        // Statistics
        statistics_description: "Verfolgen Sie Ihren Fortschritt und Ihre Leistung",
        global_progress: "Gesamtfortschritt",
        average_qcm_score: "Durchschnittliche MCQ-Note",
        subject_details: "Fachdetails",
        no_data: "Keine Daten verfügbar",
        start_studying: "Beginnen Sie mit dem Lernen, um Ihre Statistiken zu sehen",
        
        // Profile
        profile_settings: "Profileinstellungen",
        personal_info: "Persönliche Informationen",
        first_name: "Vorname",
        last_name: "Nachname",
        email: "E-Mail",
        avatar: "Avatar",
        select_avatar: "Avatar auswählen",
        language: "Sprache",
        select_language: "Sprache auswählen",
        french: "Französisch",
        english: "Englisch",
        german: "Deutsch",
        spanish: "Spanisch",
        portuguese: "Portugiesisch",
        security: "Sicherheit",
        change_password: "Passwort ändern",
        save_changes: "Änderungen speichern",
        current_password: "Aktuelles Passwort",
        new_password: "Neues Passwort",
        confirm_new_password: "Neues Passwort bestätigen",
        update_password: "Aktualisieren",
        
        // PDF Viewer
        pdf_viewer: "PDF-Viewer",
        previous: "Zurück",
        next: "Weiter"
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
        import_course: "Importar curso",
        start_qcm: "Comenzar QCM",
        ask_ai: "Preguntar IA",
        recent_courses: "Cursos recientes",
        no_courses: "Ningún curso importado",
        start_import: "Comienza importando tu primer curso",
        
        // Subjects
        subject_management: "Gestión de materias",
        subject_description: "Organiza tus cursos por materias y personaliza tu espacio",
        create_subject: "Crear materia",
        no_subjects: "Ninguna materia creada",
        create_first_subject: "Crea tu primera materia para organizar tus cursos",
        subject_name: "Nombre de la materia",
        color: "Color",
        description_optional: "Descripción (opcional)",
        create_new_subject: "Crear nueva materia",
        
        // Import
        import_description: "Importa tus PDF y deja que la IA genere automáticamente QCM y tarjetas",
        drag_drop_pdf: "Arrastra tu PDF aquí",
        or_click_select: "o haz clic para seleccionar un archivo",
        choose_file: "Elegir archivo",
        generation_options: "Opciones de generación",
        subject: "Materia",
        select_subject: "Seleccionar materia",
        qcm_count: "Número de QCM",
        difficulty_level: "Nivel de dificultad",
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        flashcards_count: "Número de tarjetas",
        analyzing_document: "Analizando documento...",
        
        // QCM
        qcm_description: "Entrena con QCM generados por IA",
        no_qcm: "Ningún QCM disponible",
        import_for_qcm: "Importa un curso para generar QCM",
        
        // Flashcards
        flashcards_description: "Revisa eficientemente con tarjetas generadas",
        no_flashcards: "Ninguna tarjeta disponible",
        import_for_flashcards: "Importa un curso para generar tarjetas",
        
        // Summaries
        summaries_description: "Consulta resúmenes generados por IA",
        no_summaries: "Ningún resumen disponible",
        import_for_summaries: "Importa un curso para generar resúmenes",
        
        // AI Chat
        ai_assistant: "Asistente IA",
        ai_description: "Haz preguntas a la IA sobre tus cursos importados",
        ai_welcome: "¡Hola! Soy tu asistente IA. Hazme preguntas sobre tus cursos importados y te ayudaré a entender mejor los conceptos.",
        all_courses: "Todos los cursos",
        ask_question: "Haz tu pregunta...",
        
        // Statistics
        statistics_description: "Sigue tu progreso y rendimiento",
        global_progress: "Progreso global",
        average_qcm_score: "Puntuación media QCM",
        subject_details: "Detalles por materia",
        no_data: "No hay datos disponibles",
        start_studying: "Comienza a estudiar para ver tus estadísticas",
        
        // Profile
        profile_settings: "Configuración del perfil",
        personal_info: "Información personal",
        first_name: "Nombre",
        last_name: "Apellido",
        email: "Correo electrónico",
        avatar: "Avatar",
        select_avatar: "Seleccionar avatar",
        language: "Idioma",
        select_language: "Seleccionar idioma",
        french: "Francés",
        english: "Inglés",
        german: "Alemán",
        spanish: "Español",
        portuguese: "Portugués",
        security: "Seguridad",
        change_password: "Cambiar contraseña",
        save_changes: "Guardar cambios",
        current_password: "Contraseña actual",
        new_password: "Nueva contraseña",
        confirm_new_password: "Confirmar nueva contraseña",
        update_password: "Actualizar",
        
        // PDF Viewer
        pdf_viewer: "Visor PDF",
        previous: "Anterior",
        next: "Siguiente"
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
        import_course: "Importar curso",
        start_qcm: "Iniciar QCM",
        ask_ai: "Perguntar IA",
        recent_courses: "Cursos recentes",
        no_courses: "Nenhum curso importado",
        start_import: "Comece importando seu primeiro curso",
        
        // Subjects
        subject_management: "Gerenciamento de matérias",
        subject_description: "Organize seus cursos por matérias e personalize seu espaço",
        create_subject: "Criar matéria",
        no_subjects: "Nenhuma matéria criada",
        create_first_subject: "Crie sua primeira matéria para organizar seus cursos",
        subject_name: "Nome da matéria",
        color: "Cor",
        description_optional: "Descrição (opcional)",
        create_new_subject: "Criar nova matéria",
        
        // Import
        import_description: "Importe seus PDFs e deixe a IA gerar automaticamente QCM e cartões",
        drag_drop_pdf: "Arraste seu PDF aqui",
        or_click_select: "ou clique para selecionar um arquivo",
        choose_file: "Escolher arquivo",
        generation_options: "Opções de geração",
        subject: "Matéria",
        select_subject: "Selecionar matéria",
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
        
        // Summaries
        summaries_description: "Consulte resumos gerados por IA",
        no_summaries: "Nenhum resumo disponível",
        import_for_summaries: "Importe um curso para gerar resumos",
        
        // AI Chat
        ai_assistant: "Assistente IA",
        ai_description: "Faça perguntas à IA sobre seus cursos importados",
        ai_welcome: "Olá! Sou seu assistente IA. Faça-me perguntas sobre seus cursos importados e eu o ajudarei a entender melhor os conceitos.",
        all_courses: "Todos os cursos",
        ask_question: "Faça sua pergunta...",
        
        // Statistics
        statistics_description: "Acompanhe seu progresso e desempenho",
        global_progress: "Progresso global",
        average_qcm_score: "Pontuação média QCM",
        subject_details: "Detalhes por matéria",
        no_data: "Nenhum dado disponível",
        start_studying: "Comece a estudar para ver suas estatísticas",
        
        // Profile
        profile_settings: "Configurações do perfil",
        personal_info: "Informações pessoais",
        first_name: "Nome",
        last_name: "Sobrenome",
        email: "E-mail",
        avatar: "Avatar",
        select_avatar: "Selecionar avatar",
        language: "Idioma",
        select_language: "Selecionar idioma",
        french: "Francês",
        english: "Inglês",
        german: "Alemão",
        spanish: "Espanhol",
        portuguese: "Português",
        security: "Segurança",
        change_password: "Alterar senha",
        save_changes: "Salvar alterações",
        current_password: "Senha atual",
        new_password: "Nova senha",
        confirm_new_password: "Confirmar nova senha",
        update_password: "Atualizar",
        
        // PDF Viewer
        pdf_viewer: "Visualizador PDF",
        previous: "Anterior",
        next: "Próximo"
    }
};

// Langue actuelle
let currentLanguage = localStorage.getItem('language') || 'fr';

// Fonction pour changer la langue
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTranslations();
}

// Fonction pour mettre à jour les traductions
function updateTranslations() {
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

// Initialiser les traductions au chargement
document.addEventListener('DOMContentLoaded', function() {
    updateTranslations();
});

// Fonction pour obtenir une traduction
function getTranslation(key) {
    return translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : key;
}