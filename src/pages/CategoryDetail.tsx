
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { mockData } from "@/data/mockData";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id || "0", 10);
  
  const { categories, sousCategories, services } = mockData;
  
  const category = categories.find(cat => cat.id === categoryId);
  const subCategories = sousCategories.filter(sc => sc.categorie.id === categoryId);
  
  // Filtrer les services par sous-catégorie
  const servicesBySubCategory = subCategories.map(sc => ({
    sousCategorie: sc,
    services: services.filter(s => s.sousCategorie.id === sc.id)
  }));

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Catégorie non trouvée
            </h1>
            <Link to="/categories" className="text-blue-600 hover:underline">
              Retour aux catégories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <span className="text-gray-800">{category.nom}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">
            Services dans la catégorie {category.nom}
          </h1>
          
          {/* Liste des sous-catégories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sous-catégories</h2>
            <div className="flex flex-wrap gap-2">
              {subCategories.map(sc => (
                <Badge 
                  key={sc.id} 
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                >
                  {sc.nom}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Services par sous-catégorie */}
          {servicesBySubCategory.map(({ sousCategorie, services }) => (
            services.length > 0 && (
              <div key={sousCategorie.id} className="mb-12">
                <h2 className="text-xl font-semibold mb-6">
                  {sousCategorie.nom}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
