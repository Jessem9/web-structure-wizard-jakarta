
import { 
  Admin, 
  Demandeur, 
  Profil, 
  ProfilPro, 
  Prestataire, 
  Feedback, 
  Categorie, 
  SousCategorie, 
  Service 
} from '../types/models';

// Catégories
export const categories: Categorie[] = [
  { id: 1, nom: "Maison" },
  { id: 2, nom: "Technologie" },
  { id: 3, nom: "Santé & Bien-être" },
  { id: 4, nom: "Formation" },
];

// Sous-catégories
export const sousCategories: SousCategorie[] = [
  { id: 1, nom: "Jardinage", categorie: categories[0] },
  { id: 2, nom: "Plomberie", categorie: categories[0] },
  { id: 3, nom: "Électricité", categorie: categories[0] },
  { id: 4, nom: "Développement Web", categorie: categories[1] },
  { id: 5, nom: "Design Graphique", categorie: categories[1] },
  { id: 6, nom: "Massage", categorie: categories[2] },
  { id: 7, nom: "Coaching", categorie: categories[2] },
  { id: 8, nom: "Cours de Langue", categorie: categories[3] },
  { id: 9, nom: "Soutien Scolaire", categorie: categories[3] },
];

// Profils
export const profils: Profil[] = [
  { 
    id: 1, 
    nom: "Dupont", 
    prenom: "Jean", 
    bio: "Professionnel du jardinage avec 10 ans d'expérience", 
    adress: "123 Rue de Paris, 75001 Paris" 
  },
  { 
    id: 2, 
    nom: "Martin", 
    prenom: "Sophie", 
    bio: "Développeuse web passionnée", 
    adress: "45 Avenue des Champs, 75008 Paris" 
  },
  { 
    id: 3, 
    nom: "Dubois", 
    prenom: "Pierre", 
    bio: "Masseur professionnel certifié", 
    adress: "78 Boulevard Saint-Michel, 75006 Paris" 
  },
  { 
    id: 4, 
    nom: "Leroy", 
    prenom: "Marie", 
    bio: "Professeur d'anglais expérimentée", 
    adress: "12 Rue de Lyon, 75012 Paris" 
  },
  { 
    id: 5, 
    nom: "Moreau", 
    prenom: "Thomas", 
    bio: "Cherche des services de qualité", 
    adress: "34 Rue du Faubourg, 75010 Paris" 
  }
];

// Profils Pro
export const profilsPro: { [key: number]: ProfilPro } = {
  1: {
    competences: ["Taille de haies", "Entretien de pelouse", "Plantation"],
    experience: ["10 ans comme jardinier municipal", "5 ans à mon compte"]
  },
  2: {
    competences: ["React", "TypeScript", "Node.js", "UI/UX"],
    experience: ["8 ans en entreprise", "3 ans en freelance"]
  },
  3: {
    competences: ["Massage californien", "Massage thaï", "Réflexologie"],
    experience: ["Formation certifiée", "5 ans de pratique"]
  },
  4: {
    competences: ["Anglais natif", "Méthodologie d'enseignement", "TOEFL"],
    experience: ["10 ans d'enseignement", "Certification TEFL"]
  }
};

// Prestataires
export const createPrestataires = (): Prestataire[] => {
  // On les crée dans une fonction pour éviter les références circulaires lors de l'initialisation
  const prestataires: Prestataire[] = [];
  
  for (let i = 1; i <= 4; i++) {
    prestataires.push({
      id: i,
      email: `${profils[i-1].prenom.toLowerCase()}.${profils[i-1].nom.toLowerCase()}@email.com`,
      motDePasse: "motdepasse123",
      historiqueService: [],
      services: [],
      profilPro: profilsPro[i]
    });
  }
  
  return prestataires;
};

// Services
export const createServices = (prestataires: Prestataire[]): Service[] => {
  return [
    {
      id: 1,
      titre: "Entretien de jardin complet",
      description: "Service d'entretien de jardin incluant tonte, taille et désherbage",
      prestataire: prestataires[0],
      sousCategorie: sousCategories[0]
    },
    {
      id: 2,
      titre: "Réparation de fuite d'eau",
      description: "Intervention rapide pour tout problème de plomberie",
      prestataire: prestataires[0],
      sousCategorie: sousCategories[1]
    },
    {
      id: 3,
      titre: "Création de site web sur mesure",
      description: "Développement de site web responsive et moderne",
      prestataire: prestataires[1],
      sousCategorie: sousCategories[3]
    },
    {
      id: 4,
      titre: "Logo et identité visuelle",
      description: "Création de logo et charte graphique pour votre entreprise",
      prestataire: prestataires[1],
      sousCategorie: sousCategories[4]
    },
    {
      id: 5,
      titre: "Massage relaxant 1h",
      description: "Séance de massage pour détente et bien-être",
      prestataire: prestataires[2],
      sousCategorie: sousCategories[5]
    },
    {
      id: 6,
      titre: "Coaching bien-être",
      description: "Accompagnement personnalisé pour retrouver équilibre et sérénité",
      prestataire: prestataires[2],
      sousCategorie: sousCategories[6]
    },
    {
      id: 7,
      titre: "Cours d'anglais pour débutants",
      description: "Cours particuliers pour apprendre les bases de l'anglais",
      prestataire: prestataires[3],
      sousCategorie: sousCategories[7]
    },
    {
      id: 8,
      titre: "Préparation aux examens",
      description: "Soutien scolaire adapté pour réussir vos examens",
      prestataire: prestataires[3],
      sousCategorie: sousCategories[8]
    }
  ];
};

// Demandeurs
export const createDemandeurs = (services: Service[]): Demandeur[] => {
  return [
    {
      id: 5,
      email: `${profils[4].prenom.toLowerCase()}.${profils[4].nom.toLowerCase()}@email.com`,
      motDePasse: "motdepasse123",
      historiqueService: [services[0], services[5]]
    }
  ];
};

// Feedbacks
export const createFeedbacks = (demandeurs: Demandeur[], services: Service[]): Feedback[] => {
  return [
    {
      id: 1,
      commentaire: "Excellent service, très professionnel",
      note: 5,
      auteur: demandeurs[0],
      service: services[0]
    },
    {
      id: 2,
      commentaire: "Bon service mais un peu en retard",
      note: 4,
      auteur: demandeurs[0],
      service: services[5]
    }
  ];
};

// Admin
export const admins: Admin[] = [
  {
    id: 1,
    nom: "Admin",
    email: "admin@example.com",
    motDePasse: "admin123"
  }
];

// Initialisation des données liées
export const initializeMockData = () => {
  const prestataires = createPrestataires();
  const services = createServices(prestataires);
  
  // Affecter les services aux prestataires
  prestataires.forEach(prestataire => {
    prestataire.services = services.filter(
      service => service.prestataire.id === prestataire.id
    );
  });
  
  const demandeurs = createDemandeurs(services);
  const feedbacks = createFeedbacks(demandeurs, services);
  
  return {
    categories,
    sousCategories,
    profils,
    prestataires,
    services,
    demandeurs,
    feedbacks,
    admins
  };
};

export const mockData = initializeMockData();
