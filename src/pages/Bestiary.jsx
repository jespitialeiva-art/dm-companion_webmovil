import { useEffect, useState } from "react";
import MonsterCard from "../components/MonsterCard";

export default function Bestiary() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMonsters() {
      try {
        setLoading(true);
        setError("");

        // Primero consultamos la lista de monstruos.
        const response = await fetch(
          "https://www.dnd5eapi.co/api/2014/monsters"
        );

        if (!response.ok) {
          throw new Error("No se pudo consultar la API");
        }

        const data = await response.json();

        // Consultamos los detalles de los primeros 20 monstruos.
        const details = await Promise.all(
          data.results.slice(0, 20).map(async (monster) => {
            const detailResponse = await fetch(
              `https://www.dnd5eapi.co${monster.url}`
            );

            if (!detailResponse.ok) {
              throw new Error("No se pudo consultar un monstruo");
            }

            return detailResponse.json();
          })
        );

        setMonsters(details);
      } catch (err) {
        setError("No se pudieron cargar los monstruos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getMonsters();
  }, []);

  // Filtramos los monstruos según el texto escrito.
  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <h2>Bestiario</h2>

      <p>Consulta los enemigos de Dungeons & Dragons 5e.</p>

      <input
        type="text"
        placeholder="Buscar monstruo..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search-input"
      />

      {loading && <p>Cargando monstruos...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <div className="monster-grid">
            {filteredMonsters.map((monster) => (
              <MonsterCard
                key={monster.index}
                monster={monster}
                onSelect={setSelectedMonster}
              />
            ))}
          </div>

          {filteredMonsters.length === 0 && (
            <p>No se encontraron monstruos.</p>
          )}
        </>
      )}

      {selectedMonster && (
        <div className="monster-details">
          <h2>{selectedMonster.name}</h2>

          <p>
            <strong>Tipo:</strong> {selectedMonster.type}
          </p>

          <p>
            <strong>Tamaño:</strong> {selectedMonster.size}
          </p>

          <p>
            <strong>Velocidad:</strong>{" "}
            {selectedMonster.speed?.walk || "No disponible"}
          </p>

          <p>
            <strong>Fuerza:</strong> {selectedMonster.strength}
          </p>

          <p>
            <strong>Destreza:</strong> {selectedMonster.dexterity}
          </p>

          <p>
            <strong>Constitución:</strong> {selectedMonster.constitution}
          </p>

          <button onClick={() => setSelectedMonster(null)}>
            Cerrar detalles
          </button>
        </div>
      )}
    </section>
  );
}