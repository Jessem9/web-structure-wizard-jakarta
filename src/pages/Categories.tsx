
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { mockData } from "@/data/mockData";
import { CategorieCard } from "@/components/CategorieCard";

const Categories = () => {
  const { categories, sousCategories } = mockData;
  
  // Obtenir les noms des sous-catégories pour chaque catégorie
  const getSousCategoriesParCategorie = (categorieId: number) => {
    return sousCategories
      .filter(sc => sc.categorie.id === categorieId)
      .map(sc => sc.nom);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Catégories de services</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(categorie => (
              <CategorieCard 
                key={categorie.id} 
                categorie={categorie} 
                sousCategories={getSousCategoriesParCategorie(categorie.id)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
