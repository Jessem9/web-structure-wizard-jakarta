
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { mockData } from "@/data/mockData";
import { Link } from "react-router-dom";
import { StarRating } from "@/components/StarRating";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Prestataires = () => {
  const { prestataires, profils, services } = mockData;
  
  // Combiner les informations des prestataires avec leurs profils
  const prestatairesWithProfile = prestataires.map(prestataire => {
    const profil = profils.find(p => p.id === prestataire.id);
    const prestataireFeedbacks = services
      .filter(s => s.prestataire.id === prestataire.id)
      .flatMap(s => s.id);
    
    return {
      prestataire,
      profil,
      servicesCount: prestataire.services.length,
      feedback: {
        count: prestataireFeedbacks.length,
        rating: 4 // Note fictive pour l'exemple
      }
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Nos prestataires</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestatairesWithProfile.map(({ prestataire, profil, servicesCount, feedback }) => (
              <Card key={prestataire.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">
                    {profil?.prenom} {profil?.nom}
                  </h2>
                  {feedback.count > 0 && (
                    <div className="flex items-center mt-1">
                      <StarRating rating={feedback.rating} />
                      <span className="ml-2 text-sm text-gray-600">
                        ({feedback.count} avis)
                      </span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pb-2">
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {profil?.bio}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>{servicesCount}</strong> service(s) proposé(s)
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {prestataire.profilPro.competences.slice(0, 3).map((competence, index) => (
                      <Badge 
                        key={index} 
                        className="bg-blue-100 text-blue-800"
                      >
                        {competence}
                      </Badge>
                    ))}
                    {prestataire.profilPro.competences.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-800">
                        +{prestataire.profilPro.competences.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 border-t">
                  <Link 
                    to={`/prestataires/${prestataire.id}`} 
                    className="w-full"
                  >
                    <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                      Voir le profil
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prestataires;
