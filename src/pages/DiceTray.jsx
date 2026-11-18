import { useState } from "react";

export default function DiceTray() {
  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

  const [selectedDice, setSelectedDice] = useState(20);
  const [result, setResult] = useState(null);

  function rollDice() {
    const number = Math.floor(Math.random() * selectedDice) + 1;
    setResult(number);
  }

  return (
    <section>
      <h2>Bandeja de dados</h2>

      <p>Selecciona un dado y realiza un lanzamiento.</p>

      <div className="dice-container">
        <h3>Selecciona un dado</h3>

        <div className="dice-buttons">
          {diceTypes.map((dice) => (
            <button
              key={dice}
              className={selectedDice === dice ? "selected" : ""}
              onClick={() => {
                setSelectedDice(dice);
                setResult(null);
              }}
            >
              d{dice}
            </button>
          ))}
        </div>

        <div className="dice-result">
          <p>Dado seleccionado: d{selectedDice}</p>
          <h1>{result === null ? "?" : result}</h1>
        </div>

        <button className="roll-button" onClick={rollDice}>
          Lanzar dado
        </button>
      </div>
    </section>
  );
}