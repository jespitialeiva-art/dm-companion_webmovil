export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <button onClick={() => setCurrentPage("bestiary")}>
        Bestiario
      </button>

      <button onClick={() => setCurrentPage("loot")}>
        Botín
      </button>

      <button onClick={() => setCurrentPage("dice")}>
        Dados
      </button>
    </nav>
  );
}