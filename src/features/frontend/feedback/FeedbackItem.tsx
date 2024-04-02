import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import Card from "../../../shared/ui/Card";

interface Feedback {
  id: number;
  text: string;
  rating: number;
}

interface FeedbackItemProps {
  item: Feedback;
  handleDelete: (id: number) => void;
}

const FeedbackItem: FC<FeedbackItemProps> = ({ item, handleDelete }) => {
  return (
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => handleDelete(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
};

export default FeedbackItem;
