export default function MonsterCard({ monster, onSelect }) {
  const armor = monster.armor_class?.[0]?.value ?? "N/D";

  return (
    <div className="monster-card">
      <h3>{monster.name}</h3>

      <p>
        <strong>Armadura:</strong> {armor}
      </p>

      <p>
        <strong>Puntos de golpe:</strong> {monster.hit_points}
      </p>

      <p>
        <strong>Nivel de desafío:</strong> {monster.challenge_rating}
      </p>

      <button onClick={() => onSelect(monster)}>
        Ver detalles
      </button>
    </div>
  );
}