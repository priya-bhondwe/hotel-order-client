import { FC } from "react";

interface Feedback {
  id: number;
  text: string;
  rating: number;
}

interface FeedbackStatsProps {
  feedback: Feedback[];
}

const FeedbackStats: FC<FeedbackStatsProps> = ({ feedback }) => {
  const average =
    feedback.length > 0
      ? (feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length)
          .toFixed(1)
          .replace(/[.,]0$/, "")
      : "0";

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} reviews</h4>
      <h4>Average rating: {isNaN(Number(average)) ? 0 : average}</h4>
    </div>
  );
};

export default FeedbackStats;
