
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { CategorieCard } from "@/components/CategorieCard";
import { Button } from "@/components/ui/button";
import { mockData } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Index = () => {
  const { categories, sousCategories, services } = mockData;
  
  // Obtenir les noms des sous-catégories pour chaque catégorie
  const getSousCategoriesParCategorie = (categorieId: number) => {
    return sousCategories
      .filter(sc => sc.categorie.id === categorieId)
      .map(sc => sc.nom);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Trouvez le bon prestataire pour votre besoin
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              ServPro connecte les demandeurs aux meilleurs prestataires de services 
              dans diverses catégories.
            </p>
            <div className="flex justify-center">
              <Link to="/services">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 mr-4">
                  Découvrir les services
                </Button>
              </Link>
              <Link to="/inscription">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Devenir prestataire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recherchez</h3>
              <p className="text-gray-600">
                Explorez les catégories et trouvez le service dont vous avez besoin.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contactez</h3>
              <p className="text-gray-600">
                Réservez un service auprès du prestataire qui correspond à votre besoin.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Évaluez</h3>
              <p className="text-gray-600">
                Donnez votre feedback après la prestation pour aider la communauté.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Catégories populaires */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Catégories populaires</h2>
            <Link to="/categories">
              <Button variant="outline">Voir toutes les catégories</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(categorie => (
              <CategorieCard 
                key={categorie.id} 
                categorie={categorie} 
                sousCategories={getSousCategoriesParCategorie(categorie.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Services récents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Services récents</h2>
            <Link to="/services">
              <Button variant="outline">Voir tous les services</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à offrir vos services ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez notre communauté de prestataires et développez votre activité.
          </p>
          <Link to="/inscription">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Devenir prestataire
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
