
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { mockData } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const { services, categories, sousCategories } = mockData;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  
  // Filtrer les sous-catégories disponibles en fonction de la catégorie sélectionnée
  const filteredSubCategories = selectedCategory
    ? sousCategories.filter(sc => sc.categorie.id === parseInt(selectedCategory, 10))
    : sousCategories;
  
  // Filtrer les services en fonction des critères de recherche
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      !selectedCategory || 
      service.sousCategorie.categorie.id === parseInt(selectedCategory, 10);
      
    const matchesSubCategory = 
      !selectedSubCategory || 
      service.sousCategorie.id === parseInt(selectedSubCategory, 10);
      
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Gestionnaire de recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La recherche se fait déjà automatiquement grâce aux états
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Tous les services</h1>
          
          {/* Filtres et recherche */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-grow">
                  <Input
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les catégories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={selectedSubCategory}
                  onValueChange={setSelectedSubCategory}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Sous-catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les sous-catégories</SelectItem>
                    {filteredSubCategories.map(subCat => (
                      <SelectItem key={subCat.id} value={subCat.id.toString()}>
                        {subCat.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Réinitialiser
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
          
          {/* Résultats */}
          <div>
            <p className="text-gray-600 mb-4">
              {filteredServices.length} service(s) trouvé(s)
            </p>
            
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  Aucun service ne correspond à votre recherche.
                </p>
                <Button 
                  variant="link" 
                  onClick={resetFilters} 
                  className="text-blue-600"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
