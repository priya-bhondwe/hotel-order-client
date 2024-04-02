import { useState, FormEvent, ChangeEvent } from "react";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Botton";
import RatingSelect from "./RatingSelect";

interface Feedback {
  text: string;
  rating: number;
}

interface FeedbackFormProps {
  handleAdd: (feedback: Feedback) => void;
}

function FeedbackForm({ handleAdd }: FeedbackFormProps) {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(10);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (newText === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (newText.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback: Feedback = {
        text,
        rating,
      };
      handleAdd(newFeedback);
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
