import { useState, useEffect } from 'react';

function MotivationCard() {
  const messages = [
    "💪 Every effort counts towards a healthier planet.",
    "🌍 Small actions lead to big changes! You matter.",
    "🌟 Green living starts today.",
    "🍃 Let's make the city fresher, starting with you and me.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h4>💬 Today's Motivation</h4>
      <p>{messages[index]}</p>
    </div>
  );
}

export default MotivationCard;
