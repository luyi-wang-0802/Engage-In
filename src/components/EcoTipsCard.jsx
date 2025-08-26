import { useState, useEffect } from 'react';

function EcoTipsCard() {
  const tips = [
    "🌱 Each tree planted absorbs about 21kg of carbon dioxide per year.",
    "🚲 Cycling 5 kilometers can reduce carbon emissions by about 1.2kg.",
    "💡 Using LED lights can save up to 80% more energy than incandescent bulbs.",
    "🛒 Bringing your own shopping bag can reduce plastic pollution.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h4>Environmental Tips</h4>
      <p>{tips[index]}</p>
    </div>
  );
}

export default EcoTipsCard;
