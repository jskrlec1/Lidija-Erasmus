import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from 'axios'; // Uvoz Axiosa

const Year2024To2025 = () => {
  const [mobilnostiNastavnika, setMobilnostiNastavnika] = useState("");
  const [mobilnostiUcenika, setMobilnostiUcenika] = useState("");
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  useEffect(() => {
    setMobilnostiNastavnika(
      localStorage.getItem("mobilnostiNastavnika2024To2025") || ""
    );
    setMobilnostiUcenika(
      localStorage.getItem("mobilnostiUcenika2024To2025") || ""
    );
    setJobShadowing(localStorage.getItem("jobShadowing2024To2025") || "");
    setAktivnosti(localStorage.getItem("aktivnosti2024To2025") || "");
    setDiseminacija(localStorage.getItem("diseminacija2024To2025") || "");
    setOstalo(localStorage.getItem("ostalo2024To2025") || "");
  }, []);

  // Funkcija za dohvaćanje podataka putem Axiosa
  const fetchDataFromAPI = () => {
    axios.get('/api/your-endpoint') // Zamijenite 'your-endpoint' s pravim API endpointom
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
  const debouncedSave = debounce(saveToLocalStorage, 1000);

  // Handler za promjene teksta koji koristi debounce
  const handleTextChange = (setterFunction, localStorageKey) => (event) => {
    const newText = event.target.value;
    setterFunction(newText);
    debouncedSave(localStorageKey, newText);
  };

  return (
    <div>
      <h2>Informacije za 2024. - 2025. godinu</h2>
      <textarea
        value={mobilnostiNastavnika}
        onChange={handleTextChange(
          setMobilnostiNastavnika,
          "mobilnostiNastavnika2024To2025"
        )}
      />
      <textarea
        value={mobilnostiUcenika}
        onChange={handleTextChange(
          setMobilnostiUcenika,
          "mobilnostiUcenika2024To2025"
        )}
      />
      <textarea
        value={jobShadowing}
        onChange={handleTextChange(setJobShadowing, "jobShadowing2024To2025")}
      />
      <textarea
        value={aktivnosti}
        onChange={handleTextChange(setAktivnosti, "aktivnosti2024To2025")}
      />
      <textarea
        value={diseminacija}
        onChange={handleTextChange(setDiseminacija, "diseminacija2024To2025")}
      />
      <textarea
        value={ostalo}
        onChange={handleTextChange(setOstalo, "ostalo2024To2025")}
      />
    </div>
  );
};

export default Year2024To2025;
