import React, { useEffect, useState } from "react";
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
//import { Pool } from 'pg';
import { polyfill } from 'es6-promise'; // Dodali smo polyfill za Promise
import 'es6-promise/auto';

function App() {
  // Definirajte stanje za podatke koje ćete dohvatiti s bazom podataka
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Postavite konfiguraciju za povezivanje sa bazom podataka
  //   const pool = new Pool({
  //     host: 'ec2-3-232-218-211.compute-1.amazonaws.com',
  //     database: 'de7qfcf7mujcbl',
  //     user: 'lwgxcprfmhnbvu',
  //     password: 'ce5f1bd0c0be2c340304a7cc4cc1ac660daef0f08851f05b510e4dfe4267c58b',
  //     port: 5432,
  //     ssl: {
  //       rejectUnauthorized: false, // Omogućite SSL
  //     },
  //   });

  //   // Izvršite SQL upit za dohvaćanje podataka iz baze podataka
  //   pool.query('SELECT * FROM tvoja_tabela') // Zamijenite 'tvoja_tabela' sa stvarnim imenom vaše tabele
  //     .then((result) => {
  //       // Ažurirajte stanje s podacima koje ste dobili iz baze
  //       setData(result.rows);
  //     })
  //     .catch((error) => {
  //       console.error('Greška pri dohvaćanju podataka:', error);
  //     });
  // }, []);

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
