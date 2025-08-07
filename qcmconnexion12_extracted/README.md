# StudyHub - Médecine

Une application web de révision médicale intelligente qui permet d'importer des cours en PDF, d'en générer automatiquement des QCM, flashcards et résumés grâce à l'IA, de s'entraîner, suivre ses progrès et collaborer avec d'autres étudiants.

## 🚀 Fonctionnalités principales

### 🔐 Authentification sécurisée
- Connexion par email + mot de passe
- Connexion via Google
- Réinitialisation du mot de passe
- Vérification email
- Sécurisation de l'accès à l'espace personnel

### 📚 Import de cours
- Interface pour importer un ou plusieurs PDF
- Extraction automatique du texte
- Aperçu et renommage du fichier
- Support des fichiers jusqu'à 10MB

### 🧠 Génération IA
- Génération automatique de QCM (choix multiples, niveau ajustable)
- Flashcards (question/réponse)
- Résumés clairs et structurés
- Options de personnalisation :
  - Nombre de questions
  - Type (rapide, approfondi)
  - Niveau de difficulté

### 🧪 Mode entraînement
- Affichage des QCM un par un
- Feedback immédiat
- Score final avec feedback
- Relecture des erreurs
- Option "Examen" sans correction immédiate

### 📊 Suivi des performances
- Statistiques par matière/thème
- Courbe de progression
- Erreurs fréquentes à revoir
- Résumés des résultats passés

### 📇 Flashcards intelligentes
- Navigation intuitive (swiper, clic)
- Marquage "Appris" ou "À revoir"
- Répétition espacée automatique

### 🧩 Organisation claire
- Classement des documents et contenus par :
  - Matière
  - Chapitre
  - Thème
- Recherche intelligente (filtrage par mot-clé ou type)

### 🎮 Gamification
- Badges (Ex. : "100 QCM réussis", "3 jours de suite")
- Tableau de bord des succès
- Objectifs journaliers/mensuels

### 📤 Partage et collaboration
- Partage de QCM/flashcards avec d'autres étudiants
- Mode "révision à deux"
- Groupes privés de travail

### 💻 Interface professionnelle et responsive
- Adaptée mobile/tablette/ordinateur
- Design motivant, fluide, clair
- Thèmes clairs et sombres

### ☁️ Synchronisation cloud
- Stockage dans Firebase Firestore
- Accessible depuis n'importe quel appareil
- Résilience (si tu te déconnectes, rien n'est perdu)

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Authentification** : Firebase Auth
- **Base de données** : Firebase Firestore
- **Stockage** : Firebase Storage
- **IA** : Intégration OpenAI (simulation)
- **Design** : CSS Grid, Flexbox, Animations CSS
- **Responsive** : Mobile-first design

## 📁 Structure du projet

```
studyhub/
├── index.html              # Page d'accueil
├── login.html              # Page de connexion
├── register.html           # Page d'inscription
├── dashboard.html          # Dashboard principal
├── faq.html               # Page FAQ
├── css/
│   ├── style.css          # Styles principaux
│   ├── auth.css           # Styles authentification
│   └── dashboard.css      # Styles dashboard
├── js/
│   ├── main.js            # JavaScript principal
│   ├── auth.js            # Authentification
│   ├── register.js        # Inscription
│   └── dashboard.js       # Dashboard
└── README.md              # Documentation
```

## 🚀 Installation et déploiement

### Prérequis
- Un navigateur web moderne
- Connexion internet pour Firebase

### Déploiement sur Netlify

1. **Préparer les fichiers**
   ```bash
   # Tous les fichiers sont déjà prêts pour le déploiement
   ```

2. **Déployer sur Netlify**
   - Connectez-vous à [Netlify](https://netlify.com)
   - Glissez-déposez le dossier du projet
   - Ou connectez votre repository GitHub
   - Le site sera automatiquement déployé

3. **Configuration Firebase**
   - Les clés Firebase sont déjà configurées
   - L'authentification est prête à l'emploi

## 🎯 Utilisation

### 1. Créer un compte
- Allez sur la page d'accueil
- Cliquez sur "Commencer gratuitement"
- Créez votre compte avec email ou Google

### 2. Importer un cours
- Connectez-vous au dashboard
- Allez dans la section "Importer"
- Glissez-déposez votre PDF ou cliquez pour sélectionner
- Configurez les options de génération
- Attendez que l'IA traite votre document

### 3. Réviser avec les QCM
- Allez dans la section "QCM"
- Choisissez un cours
- Répondez aux questions
- Consultez vos résultats

### 4. Utiliser les flashcards
- Allez dans la section "Flashcards"
- Choisissez un cours
- Naviguez entre les cartes
- Marquez les cartes comme apprises

### 5. Consulter les résumés
- Allez dans la section "Résumés"
- Consultez les résumés générés par l'IA
- Notez les points clés

### 6. Suivre vos progrès
- Allez dans la section "Statistiques"
- Consultez vos performances
- Suivez votre progression

## 🔧 Configuration Firebase

L'application utilise Firebase pour l'authentification et le stockage. La configuration est déjà incluse :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCqGSBrsJ-7PIpfjAM58gD8h4VcY793rWQ",
  authDomain: "studyhub-proje.firebaseapp.com",
  projectId: "studyhub-proje",
  storageBucket: "studyhub-proje.appspot.com",
  messagingSenderId: "359347355393",
  appId: "1:359347355393:web:8c05ede417c10c272d6500",
  measurementId: "G-DMQJNJW9S0"
};
```

## 🎨 Design et UX

### Couleurs principales
- **Bleu principal** : #2563eb
- **Vert succès** : #10b981
- **Rouge erreur** : #ef4444
- **Gris neutre** : #64748b

### Typographie
- **Police** : Inter (Google Fonts)
- **Poids** : 300, 400, 500, 600, 700

### Responsive Design
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🔒 Sécurité

- Authentification Firebase sécurisée
- Validation côté client et serveur
- Protection contre les injections
- Chiffrement des données sensibles
- HTTPS obligatoire en production

## 📱 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile (iOS/Android)

## 🚀 Fonctionnalités avancées

### Génération IA simulée
L'application simule la génération IA avec des données d'exemple. Pour une vraie intégration :

1. **OpenAI API**
   ```javascript
   // Exemple d'intégration OpenAI
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${OPENAI_API_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       model: "gpt-4",
       messages: [
         {
           role: "system",
           content: "Génère des QCM médicaux basés sur ce contenu..."
         },
         {
           role: "user",
           content: extractedText
         }
       ]
     })
   });
   ```

2. **PDF Processing**
   ```javascript
   // Exemple avec pdf.js
   import * as pdfjsLib from 'pdfjs-dist';
   const pdf = await pdfjsLib.getDocument(file).promise;
   ```

## 🎯 Roadmap

### Phase 1 (Actuelle)
- ✅ Authentification Firebase
- ✅ Import PDF basique
- ✅ Génération QCM simulée
- ✅ Interface dashboard
- ✅ Statistiques de base

### Phase 2 (Prochaine)
- 🔄 Intégration OpenAI réelle
- 🔄 Traitement PDF avancé
- 🔄 Mode examen
- 🔄 Partage entre utilisateurs

### Phase 3 (Future)
- 📋 IA conversationnelle
- 📋 Reconnaissance vocale
- 📋 Mode hors ligne
- 📋 Applications mobiles

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Email : contact@studyhub-med.com
- FAQ : [Page FAQ](faq.html)
- Documentation : Ce README

---

**StudyHub** - Révolutionnez votre révision médicale avec l'IA ! 🧠📚