
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FeedbackCard } from "@/components/FeedbackCard";
import { StarRating } from "@/components/StarRating";
import { mockData } from "@/data/mockData";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const serviceId = parseInt(id || "0", 10);
  
  const { services, feedbacks } = mockData;
  
  const service = services.find(s => s.id === serviceId);
  const serviceFeedbacks = feedbacks.filter(f => f.service.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Service non trouvé
            </h1>
            <Link to="/services" className="text-blue-600 hover:underline">
              Retour aux services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculer la note moyenne
  const averageRating = serviceFeedbacks.length > 0
    ? serviceFeedbacks.reduce((acc, curr) => acc + curr.note, 0) / serviceFeedbacks.length
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Fil d'Ariane */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">Accueil</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/categories" className="hover:text-blue-600">Catégories</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link 
              to={`/categories/${service.sousCategorie.categorie.id}`}
              className="hover:text-blue-600"
            >
              {service.sousCategorie.categorie.nom}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-800">{service.titre}</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* En-tête du service */}
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{service.titre}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      {service.sousCategorie.nom}
                    </Badge>
                    {serviceFeedbacks.length > 0 && (
                      <div className="flex items-center">
                        <StarRating rating={Math.round(averageRating)} />
                        <span className="ml-2 text-sm text-gray-600">
                          ({serviceFeedbacks.length} avis)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Réserver ce service
                  </Button>
                  <Button variant="outline">
                    Contacter le prestataire
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Corps du service */}
            <div className="p-6 md:flex gap-8">
              {/* Description */}
              <div className="flex-grow md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                {/* Commentaires supplémentaires pour remplir la description */}
                <p className="text-gray-600 mb-4">
                  Notre prestataire est disponible pour vous aider avec ce service. 
                  Nous garantissons un travail de qualité et un résultat qui répondra à vos attentes.
                </p>
                <p className="text-gray-600">
                  N'hésitez pas à nous contacter pour plus d'informations ou pour 
                  discuter de vos besoins spécifiques.
                </p>
              </div>
              
              {/* Informations sur le prestataire */}
              <div className="md:w-1/3 mt-8 md:mt-0">
                <h2 className="text-xl font-semibold mb-4">Prestataire</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">
                    {service.prestataire.email.split('@')[0]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Prestataire professionnel dans {service.sousCategorie.categorie.nom}
                  </p>
                  <Link 
                    to={`/prestataires/${service.prestataire.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Voir le profil complet
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Avis */}
            <div className="p-6 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Avis clients ({serviceFeedbacks.length})
              </h2>
              
              {serviceFeedbacks.length > 0 ? (
                <div className="space-y-4">
                  {serviceFeedbacks.map(feedback => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Aucun avis pour ce service pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
