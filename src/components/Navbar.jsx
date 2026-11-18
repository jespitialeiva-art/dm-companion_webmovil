export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">

      <button
        className={currentPage === "bestiary" ? "active" : ""}
        onClick={() => setCurrentPage("bestiary")}
      >
        Bestiario
      </button>

      <button
        className={currentPage === "loot" ? "active" : ""}
        onClick={() => setCurrentPage("loot")}
      >
        Botín
      </button>

      <button
        className={currentPage === "dice" ? "active" : ""}
        onClick={() => setCurrentPage("dice")}
      >
        Dados
      </button>

    </nav>
  );
}