import React from "react";
import YearButton from "./YearButton";

const ErasmusAccreditation = () => {
  return (
    <div className="container text-center">
      <h1>Erasmus Akreditacija - OŠ Vladimira Nazora, Vinkovci</h1>
      <p className="lead">2023. - 2027.</p>
      {/* Ovdje koristite direktnu referencu na sliku iz public direktorija */}
      <img
        src={`${process.env.PUBLIC_URL}/Erasmus LOGO ŠKOLE.png`}
        alt="Erasmus Akreditacija Logo"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="d-flex flex-column">
        <YearButton year="2023/2024" path="/2023-2024" />
        <YearButton year="2024/2025" path="/2024-2025" />
        <YearButton year="2025/2026" path="/2025-2026" />
        <YearButton year="2026/2027" path="/2026-2027" />

        <h2 className="font-weight-bold border-bottom mt-5">
          Vanjske poveznice:
        </h2>
        <h3 className="mt-5">
          <a href="http://ampeu.hr/" target="_blank" rel="noopener noreferrer">
            AMPEU stranica
          </a>
        </h3>
        <h3>
          <a
            href="https://webgate.ec.europa.eu/beneficiary-module/project/#/project-list"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beneficiary Module
          </a>
        </h3>
        <h3>
          <a
            href="http://os-vnazora-vk.skole.hr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web stranica škole
          </a>
        </h3>
        <h3>
          <a
            href="https://www.facebook.com/Ekids2020/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook stranica škole
          </a>
        </h3>
        <h3>
          <a
            href="http://projekt.hr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web stranica projekta
          </a>
        </h3>
      </div>
    </div>
  );
};

export default ErasmusAccreditation;
