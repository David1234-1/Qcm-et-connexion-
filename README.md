# StudyHub - Plateforme de Révision Intelligente

StudyHub est une application web moderne qui utilise l'intelligence artificielle pour transformer vos documents PDF en outils d'apprentissage interactifs. Importez vos cours, et l'IA génère automatiquement des QCM, des flashcards et des résumés pour optimiser votre révision.

## 🚀 Fonctionnalités Principales

### 📚 Import et Analyse de Documents
- **Import PDF** : Glissez-déposez vos fichiers PDF ou sélectionnez-les depuis votre ordinateur
- **Analyse IA** : Après l'import, cliquez sur "Analyser" pour que l'IA traite votre document
- **Génération automatique** : Création de QCM, flashcards et résumés basés sur le contenu
- **Options personnalisables** : Choisissez le nombre de questions, la difficulté et le nombre de flashcards

### 🎯 QCM Interactifs
- Questions à choix multiples générées par IA
- Différents niveaux de difficulté (Facile, Moyen, Difficile)
- Suivi des performances et statistiques
- Explications détaillées pour chaque réponse

### 🗂️ Flashcards Intelligentes
- Cartes de révision générées automatiquement
- Système de révision espacée
- Suivi de l'apprentissage
- Interface intuitive pour la révision

### 📊 Statistiques et Suivi
- Tableau de bord avec métriques détaillées
- Progression globale et par matière
- Scores moyens et tendances
- Historique des performances

### ⚙️ Paramètres Personnalisables
- **Changement de langue** : Français, Anglais, Espagnol, Allemand
- **Thèmes** : Mode clair et sombre
- **Notifications** : Email, push et rappels de révision
- **Profil utilisateur** : Avatar personnalisable, bio, informations

### 👤 Gestion de Profil
- **Avatars personnalisables** : Uploadez votre photo de profil
- **Informations personnelles** : Nom, email, bio
- **Préférences sauvegardées** : Toutes vos préférences sont conservées

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Authentification** : Firebase Authentication
- **Stockage** : LocalStorage pour les données utilisateur
- **UI/UX** : Design moderne avec animations fluides
- **Responsive** : Compatible mobile et desktop

## 📁 Structure du Projet

```
studyhub/
├── index.html              # Page d'accueil
├── login.html              # Page de connexion
├── register.html           # Page d'inscription
├── dashboard.html          # Dashboard principal
├── faq.html               # FAQ
├── css/
│   ├── style.css          # Styles généraux
│   ├── auth.css           # Styles d'authentification
│   └── dashboard.css      # Styles du dashboard
├── js/
│   ├── main.js            # Fonctions principales
│   ├── auth.js            # Authentification Firebase
│   ├── register.js        # Inscription
│   └── dashboard.js       # Logique du dashboard
└── README.md              # Documentation
```

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet pour Firebase

### Installation
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Créez un compte ou connectez-vous
4. Commencez à importer vos documents PDF !

### Utilisation
1. **Import** : Glissez-déposez un PDF dans la zone d'import
2. **Configuration** : Choisissez vos options de génération
3. **Analyse** : Cliquez sur "Analyser" pour traiter le document
4. **Révision** : Utilisez les QCM et flashcards générés
5. **Suivi** : Consultez vos statistiques et progrès

## 🔧 Fonctionnalités Techniques

### Import PDF
- Validation des fichiers (PDF uniquement, max 10MB)
- Lecture et traitement du contenu
- Barre de progression en temps réel
- Gestion des erreurs

### Analyse IA
- Traitement du contenu textuel
- Identification des concepts clés
- Génération de questions pertinentes
- Création de flashcards structurées

### Système de Paramètres
- Sauvegarde automatique des préférences
- Changement de langue en temps réel
- Basculement thème clair/sombre
- Gestion des notifications

### Gestion des Avatars
- Upload d'images personnalisées
- Redimensionnement automatique
- Sauvegarde en base64
- Affichage dans l'interface

## 🎨 Interface Utilisateur

### Design Moderne
- Interface épurée et intuitive
- Animations fluides et transitions
- Design responsive pour tous les écrans
- Thèmes clair et sombre

### Navigation
- Menu de navigation fixe
- Sections organisées logiquement
- Accès rapide aux fonctionnalités
- Indicateurs visuels de progression

### Feedback Utilisateur
- Messages de confirmation/erreur
- Barres de progression
- États de chargement
- Notifications contextuelles

## 🔒 Sécurité

- Authentification Firebase sécurisée
- Validation des données côté client
- Protection contre les injections
- Gestion sécurisée des tokens

## 📱 Compatibilité

- **Desktop** : Chrome, Firefox, Safari, Edge
- **Mobile** : iOS Safari, Chrome Mobile
- **Tablette** : iPad, Android Tablets
- **Résolutions** : 320px à 4K

## 🚧 Améliorations Récentes

### Version 2.0
- ✅ **Import PDF amélioré** : Vraie lecture des fichiers PDF
- ✅ **Fonction d'analyse** : Bouton "Analyser" après import
- ✅ **Système de paramètres** : Langue, thème, notifications
- ✅ **Gestion des avatars** : Upload et personnalisation
- ✅ **Thème sombre** : Mode sombre complet
- ✅ **Interface utilisateur** : Menu dropdown, navigation améliorée
- ✅ **Sauvegarde des préférences** : Persistance des paramètres

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Consultez la FAQ intégrée
- Vérifiez la documentation
- Contactez l'équipe de support

---

**StudyHub** - Transformez vos documents en outils d'apprentissage intelligents ! 🎓