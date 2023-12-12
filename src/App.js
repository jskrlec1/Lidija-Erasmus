import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import ErasmusAccreditation from "./components/ErasmusAccreditation";
import Year2023To2024 from "./components/Year2023To2024";
import Year2024To2025 from "./components/Year2024To2025";
import Year2025To2026 from "./components/Year2025To2026";
import Year2026To2027 from "./components/Year2026To2027";
import Tenerife from "./components/Tenerife";
import Budimpešta from "./components/Budimpešta";
import Rim from "./components/Rim";
import Španjolska from "./components/Španjolska";
import Italija from "./components/Italija";

function App() {
  // Definirajte stanje za podatke koje ćete dohvatiti s Axiosom
  const [data, setData] = useState([]);

  // Koristite useEffect za izradu Axios zahtjeva nakon što se komponenta montira
  useEffect(() => {
    // Izradite Axios zahtjev ovdje
    axios.get("https://api.example.com/some-data")
      .then(response => {
        // Ažurirajte stanje s podacima koje ste dobili iz odgovora
        setData(response.data);
      })
      .catch(error => {
        // Obrada greške ako se dogodi
        console.error("Greška pri dohvaćanju podataka:", error);
      });
  }, []); // Prazno polje označava da će se useEffect izvršiti samo pri montiranju komponente

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ErasmusAccreditation data={data} />} />
        <Route path="/2023-2024" element={<Year2023To2024 data={data} />} />
        <Route path="/2024-2025" element={<Year2024To2025 data={data} />} />
        <Route path="/2025-2026" element={<Year2025To2026 data={data} />} />
        <Route path="/2026-2027" element={<Year2026To2027 data={data} />} />
        <Route path="/tenerife" element={<Tenerife data={data} />} />
        <Route path="/budimpešta" element={<Budimpešta data={data} />} />
        <Route path="/rim" element={<Rim data={data} />} />
        <Route path="/španjolska" element={<Španjolska data={data} />} />
        <Route path="/italija" element={<Italija data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
