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
        const response = await fetch(
          "https://www.dnd5eapi.co/api/2014/monsters"
        );

        if (!response.ok) {
          throw new Error("Error al consultar la API");
        }

        const data = await response.json();

        setMonsters(data.results);
      } catch (err) {
        setError("No se pudieron cargar los monstruos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getMonsters();
  }, []);

  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  async function viewMonster(monster) {
    try {
      setError("");
      setLoading(true);
      setSelectedMonster(null);

      const response = await fetch(
        `https://www.dnd5eapi.co${monster.url}`
      );

      if (!response.ok) {
        throw new Error("Error al consultar el monstruo");
      }

      const data = await response.json();

      setSelectedMonster(data);
    } catch (err) {
      setError("No se pudieron cargar los detalles.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Bestiario</h2>

      <p>Consulta los monstruos de Dungeons & Dragons 5e.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Buscar monstruo..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p>Cargando...</p>}

      {error && <p>{error}</p>}

      {!loading && (
        <div className="monster-grid">
          {filteredMonsters.slice(0, 30).map((monster) => (
            <div className="monster-card" key={monster.index}>
              <h3>{monster.name}</h3>

              <button onClick={() => viewMonster(monster)}>
                Ver estadísticas
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedMonster && (
        <div className="monster-details">
          <h2>{selectedMonster.name}</h2>

          <MonsterCard
            monster={selectedMonster}
            onSelect={() => {}}
          />

          <p>Tipo: {selectedMonster.type}</p>
          <p>Tamaño: {selectedMonster.size}</p>
          <p>Fuerza: {selectedMonster.strength}</p>
          <p>Destreza: {selectedMonster.dexterity}</p>

          <button onClick={() => setSelectedMonster(null)}>
            Cerrar detalles
          </button>
        </div>
      )}
    </section>
  );
}