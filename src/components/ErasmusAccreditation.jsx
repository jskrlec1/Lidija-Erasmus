import React, { useState } from "react";
import YearButton from "./YearButton";

const ErasmusAccreditation = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkPassword = () => {
    const correctPassword = "mojlidac"; // Zamijenite sa stvarnom lozinkom
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Pogrešna lozinka!");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkPassword();
    }
  };

  return (
    <div className="container text-center">
      <h1>Erasmus Akreditacija - OŠ Vladimira Nazora, Vinkovci</h1>
      <p className="lead">2023. - 2027.</p>
      <img
        src={`${process.env.PUBLIC_URL}/Erasmus LOGO ŠKOLE.png`}
        alt="Erasmus Akreditacija Logo"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      {!isAuthenticated && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkPassword();
          }}
        >
          <div>
            <input
              type="text"
              autoComplete="username"
              style={{ display: "none" }}
              value="uniqueUsername" // Vrijednost koja se ne mijenja
              readOnly // Dodano kako bi se izbjeglo upozorenje
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              autoFocus
              className="form-control form-control-lg mb-4"
              placeholder=""
              style={{
                width: "auto",
                maxWidth: "100%",
                display: "inline-block",
              }}
              autoComplete="current-password"
            />
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill"
            >
              Unesi lozinku
            </button>
          </div>
        </form>
      )}

      {isAuthenticated && (
        <div>
          <div className="d-flex flex-column">
            <YearButton year="2023/2024" path="/2023-2024" />
            <YearButton year="2024/2025" path="/2024-2025" />
            <YearButton year="2025/2026" path="/2025-2026" />
            <YearButton year="2026/2027" path="/2026-2027" />
          </div>

          <h2 className="font-weight-bold border-bottom mt-5">
            Vanjske poveznice:
          </h2>
          <div className="mt-5">
            <a
              href="http://ampeu.hr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AMPEU stranica
            </a>
          </div>
          <div>
            <a
              href="https://webgate.ec.europa.eu/beneficiary-module/project/#/project-list"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beneficiary Module
            </a>
          </div>
          <div>
            <a
              href="http://os-vnazora-vk.skole.hr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web stranica škole
            </a>
          </div>
          <div>
            <a
              href="https://www.facebook.com/Ekids2020/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook stranica škole
            </a>
          </div>
          <div>
            <a
              href="http://projekt.hr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web stranica projekta
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErasmusAccreditation;
