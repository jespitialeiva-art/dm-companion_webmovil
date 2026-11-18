import { useState } from "react";

import Navbar from "./components/Navbar";
import Bestiary from "./pages/Bestiary";
import LootGenerator from "./pages/LootGenerator";
import DiceTray from "./pages/DiceTray";

import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("bestiary");

  return (
    <div className="app">
      <header>
        <h1>DM Companion</h1>
        <p>Asistente para Dungeon Masters</p>
      </header>

      <main>
        {currentPage === "bestiary" && <Bestiary />}

        {currentPage === "loot" && <LootGenerator />}

        {currentPage === "dice" && <DiceTray />}
      </main>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}