
import { Link } from "react-router-dom";
import { Service } from "@/types/models";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{service.titre}</h3>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {service.sousCategorie.nom}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-gray-600 line-clamp-3">{service.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="flex items-center">
          <Link 
            to={`/prestataires/${service.prestataire.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {service.prestataire.email.split('@')[0]}
          </Link>
        </div>
        <Link to={`/services/${service.id}`}>
          <Badge className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
            Détails
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  );
};
