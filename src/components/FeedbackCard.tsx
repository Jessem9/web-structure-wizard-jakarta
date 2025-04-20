
import { Feedback } from "@/types/models";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";

interface FeedbackCardProps {
  feedback: Feedback;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <Card className="hover:shadow-sm transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            {feedback.auteur.email.split('@')[0]}
          </h3>
          <StarRating rating={feedback.note} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{feedback.commentaire}</p>
      </CardContent>
    </Card>
  );
};
