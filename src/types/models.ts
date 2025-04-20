
// Types représentant la structure du diagramme UML

export interface Admin {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
}

export interface Demandeur {
  id: number;
  email: string;
  motDePasse: string;
  historiqueService: Service[];
  
  authentifier?: () => boolean;
  gererUtilisateurs?: () => void;
}

export interface Profil {
  id: number;
  nom: string;
  prenom: string;
  bio: string;
  adress: string;
  
  gererProfile?: () => void;
  profilePro?: () => ProfilPro | null;
  consulterProfils?: () => Profil[];
}

export interface ProfilPro {
  competences: string[];
  experience: string[];
}

export interface Prestataire extends Demandeur {
  services: Service[];
  profilPro: ProfilPro;
  
  creerService?: () => Service;
  gererPrestataires?: () => void;
}

export interface Feedback {
  id: number;
  commentaire: string;
  note: number;
  auteur: Demandeur;
  service: Service;
  
  donnerFeedback?: () => void;
}

export interface Categorie {
  id: number;
  nom: string;
}

export interface SousCategorie {
  id: number;
  nom: string;
  categorie: Categorie;
  
  getServices?: () => Service[];
}

export interface Service {
  id: number;
  titre: string;
  description: string;
  prestataire: Prestataire;
  sousCategorie: SousCategorie;
  reservePar?: Demandeur;
  
  reserverService?: () => boolean;
}
