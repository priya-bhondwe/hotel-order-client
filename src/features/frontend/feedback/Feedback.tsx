import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
// import Header from "./components/Header";
import FeedbackList from "./FeedbackList";
import FeedbackData from "../../../shared/ui/data/FeedbackData";
import FeedbackStats from "./FeedbackStats";
import FeedbackForm from "./FeedbackForm";
import { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback: any) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedBack = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFeedback(feedback.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedBack} />
      </div>
    </>
  );
}

export default Feedback;
