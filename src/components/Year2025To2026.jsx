import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from 'axios'; // Uvoz Axiosa

const Year2025To2026 = () => {
  const [mobilnostiNastavnika, setMobilnostiNastavnika] = useState("");
  const [mobilnostiUcenika, setMobilnostiUcenika] = useState("");
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  useEffect(() => {
    setMobilnostiNastavnika(
      localStorage.getItem("mobilnostiNastavnika2025To2026") || ""
    );
    setMobilnostiUcenika(
      localStorage.getItem("mobilnostiUcenika2025To2026") || ""
    );
    setJobShadowing(localStorage.getItem("jobShadowing2025To2026") || "");
    setAktivnosti(localStorage.getItem("aktivnosti2025To2026") || "");
    setDiseminacija(localStorage.getItem("diseminacija2025To2026") || "");
    setOstalo(localStorage.getItem("ostalo2025To2026") || "");
  }, []);

  // Funkcija za dohvaćanje podataka putem Axiosa
  const fetchDataFromAPI = () => {
    axios.get("postgres://lwgxcprfmhnbvu:ce5f1bd0c0be2c340304a7cc4cc1ac660daef0f08851f05b510e4dfe4267c58b@ec2-3-232-218-211.compute-1.amazonaws.com:5432/de7qfcf7mujcbl") // Zamijenite 'your-endpoint' s pravim API endpointom
      .then((response) => {
        // Ažurirajte stanje komponente s podacima iz odgovora
        setMobilnostiNastavnika(response.data.mobilnostiNastavnika);
        setMobilnostiUcenika(response.data.mobilnostiUcenika);
        setJobShadowing(response.data.jobShadowing);
        setAktivnosti(response.data.aktivnosti);
        setDiseminacija(response.data.diseminacija);
        setOstalo(response.data.ostalo);
      })
      .catch((error) => {
        // Tretirajte greške
        console.error(error);
      });
  };

  // Dohvaćanje podataka iz API-ja kada se komponenta montira
  useEffect(() => {
    fetchDataFromAPI();
  }, []);
  
  // Funkcija za spremanje u localStorage
  const saveToLocalStorage = (localStorageKey, value) => {
    localStorage.setItem(localStorageKey, value);
  };

  // Debounced verzija funkcije za spremanje
  const debouncedSave = debounce(saveToLocalStorage, 300);

  // Handler za promjene teksta koji koristi debounce
  const handleTextChange = (setterFunction, localStorageKey) => (event) => {
    const newText = event.target.value;
    setterFunction(newText);
    debouncedSave(localStorageKey, newText);
  };

  return (
    <div>
      <h2>Informacije za 2025. - 2026. godinu</h2>
      <textarea
        value={mobilnostiNastavnika}
        onChange={handleTextChange(
          setMobilnostiNastavnika,
          "mobilnostiNastavnika2025To2026"
        )}
      />
      <textarea
        value={mobilnostiUcenika}
        onChange={handleTextChange(
          setMobilnostiUcenika,
          "mobilnostiUcenika2025To2026"
        )}
      />
      <textarea
        value={jobShadowing}
        onChange={handleTextChange(setJobShadowing, "jobShadowing2025To2026")}
      />
      <textarea
        value={aktivnosti}
        onChange={handleTextChange(setAktivnosti, "aktivnosti2025To2026")}
      />
      <textarea
        value={diseminacija}
        onChange={handleTextChange(setDiseminacija, "diseminacija2025To2026")}
      />
      <textarea
        value={ostalo}
        onChange={handleTextChange(setOstalo, "ostalo2025To2026")}
      />
    </div>
  );
};

export default Year2025To2026;
