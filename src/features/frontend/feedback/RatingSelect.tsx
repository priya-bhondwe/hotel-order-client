import { useState, ChangeEvent } from "react";

interface RatingSelectProps {
  select: (value: number) => void;
}

const RatingSelect: React.FC<RatingSelectProps> = ({ select }) => {
  const [selected, setSelected] = useState<number>(10);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value, 10);
    setSelected(value);
    select(value);
  };

  return (
    <ul className="rating">
      {[...Array(10)].map((_, index) => (
        <li key={index}>
          <input
            type="radio"
            id={`num${index + 1}`}
            name="rating"
            value={`${index + 1}`}
            onChange={handleChange}
            checked={selected === index + 1}
          />
          <label htmlFor={`num${index + 1}`}>{index + 1}</label>
        </li>
      ))}
    </ul>
  );
};

export default RatingSelect;
