import { useState } from 'react';

function PublicPollCard() {
  const [votes, setVotes] = useState({ green: 6, transport: 10 });

  const vote = (option) => {
    setVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
  };

  return (
    <div className="card">
      <h4>📊 Which city improvement do you support more?</h4>
      <button onClick={() => vote("green")}>🌳 Increase Green Spaces ({votes.green})</button>
      <button onClick={() => vote("transport")}>🚍 Improve Public Transit ({votes.transport})</button>
    </div>
  );
}

export default PublicPollCard;
