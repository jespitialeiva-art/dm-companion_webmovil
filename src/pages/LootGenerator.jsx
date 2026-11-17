import { useState } from "react";

export default function LootGenerator() {
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(null);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  async function generateLoot() {
    setLoading(true);
    setError("");
    setCoins(null);
    setItem(null);

    try {
      const cr = Number(level);

      // Las recompensas aumentan con la dificultad.
      const multiplier = cr + 1;

      const newCoins = {
        gold: randomNumber(10 * multiplier),
        silver: randomNumber(20 * multiplier),
        copper: randomNumber(30 * multiplier),
      };

      // Los enemigos más difíciles pueden dar objetos mágicos.
      const endpoint =
        cr >= 11 ? "magic-items" : "equipment";

      const response = await fetch(
        `https://www.dnd5eapi.co/api/2014/${endpoint}`
      );

      if (!response.ok) {
        throw new Error("Error al consultar la API");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No se encontraron objetos");
      }

      // Seleccionamos un objeto aleatorio de la API.
      const position = Math.floor(
        Math.random() * data.results.length
      );

      const selectedItem = data.results[position];

      setCoins(newCoins);
      setItem(selectedItem);
    } catch (err) {
      setError("No se pudo generar el botín. Intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Generador de botín</h2>

      <p>
        Selecciona el nivel de desafío del monstruo
        derrotado para generar una recompensa.
      </p>

      <div className="loot-container">
        <label htmlFor="level">
          Nivel de desafío (CR):
        </label>

        <select
          id="level"
          value={level}
          onChange={(event) => setLevel(Number(event.target.value))}
        >
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index} value={index}>
              CR {index}
            </option>
          ))}
        </select>

        <button onClick={generateLoot} disabled={loading}>
          {loading ? "Generando..." : "Generar botín"}
        </button>

        {error && <p role="alert">{error}</p>}

        {coins && item && (
          <div className="loot-result">
            <h3>Recompensa obtenida</h3>

            <h4>Monedas</h4>

            <p>Oro: {coins.gold} monedas</p>
            <p>Plata: {coins.silver} monedas</p>
            <p>Cobre: {coins.copper} monedas</p>

            <h4>Objeto encontrado</h4>

            <p>{item.name}</p>

            <p className="loot-note">
              Objeto obtenido desde la API de D&D 5e.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}