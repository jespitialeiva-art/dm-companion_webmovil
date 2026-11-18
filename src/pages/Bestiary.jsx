import { useEffect, useState } from "react";
import MonsterCard from "../components/MonsterCard";

export default function Bestiary() {
  const [monsters, setMonsters] = useState([]);
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageSize = 12;

  // Obtener la lista completa de monstruos.
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
        setError("No se pudo consultar el bestiario.");
        setLoading(false);
      }
    }

    getMonsters();
  }, []);

  // Buscar por nombre.
  const filtered = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);

  // Elegir los monstruos de la página actual.
  const visible = filtered.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  // Consultar las estadísticas de los monstruos visibles.
  useEffect(() => {
    let active = true;

    async function getDetails() {
      setLoading(true);
      setError("");

      try {
        const results = await Promise.all(
          visible.map(async (monster) => {
            const response = await fetch(
              `https://www.dnd5eapi.co${monster.url}`
            );

            if (!response.ok) {
              throw new Error("Error al consultar estadísticas");
            }

            return response.json();
          })
        );

        if (active) {
          setDetails(results);
        }
      } catch (err) {
        if (active) {
          setError("No se pudieron cargar las estadísticas.");
          setDetails([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    getDetails();

    return () => {
      active = false;
    };
  }, [monsters, search, page]);

  return (
    <section>
      <h2>Bestiario</h2>

      <p>Consulta los monstruos de Dungeons & Dragons 5e.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Buscar monstruo..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
          setSelectedMonster(null);
        }}
      />

      {loading && <p>Cargando monstruos...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <div className="monster-grid">
            {details.map((monster) => (
              <MonsterCard
                key={monster.index}
                monster={monster}
                onSelect={setSelectedMonster}
              />
            ))}
          </div>

          {details.length === 0 && (
            <p>No se encontraron monstruos.</p>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage(page - 1);
                  setSelectedMonster(null);
                }}
              >
                Anterior
              </button>

              <span>
                Página {page + 1} de {totalPages}
              </span>

              <button
                disabled={page >= totalPages - 1}
                onClick={() => {
                  setPage(page + 1);
                  setSelectedMonster(null);
                }}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {selectedMonster && (
        <div className="monster-details">
          <h2>{selectedMonster.name}</h2>

          <p><strong>Tipo:</strong> {selectedMonster.type}</p>
          <p><strong>Tamaño:</strong> {selectedMonster.size}</p>
          <p><strong>Fuerza:</strong> {selectedMonster.strength}</p>
          <p><strong>Destreza:</strong> {selectedMonster.dexterity}</p>
          <p><strong>Constitución:</strong> {selectedMonster.constitution}</p>

          <button onClick={() => setSelectedMonster(null)}>
            Cerrar detalles
          </button>
        </div>
      )}
    </section>
  );
}