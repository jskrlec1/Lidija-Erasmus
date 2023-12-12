import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from 'axios'; // Uvoz Axiosa

const Year2026To2027 = () => {
  const [mobilnostiNastavnika, setMobilnostiNastavnika] = useState("");
  const [mobilnostiUcenika, setMobilnostiUcenika] = useState("");
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  useEffect(() => {
    setMobilnostiNastavnika(
      localStorage.getItem("mobilnostiNastavnika2026To2027") || ""
    );
    setMobilnostiUcenika(
      localStorage.getItem("mobilnostiUcenika2026To2027") || ""
    );
    setJobShadowing(localStorage.getItem("jobShadowing2026To2027") || "");
    setAktivnosti(localStorage.getItem("aktivnosti2026To2027") || "");
    setDiseminacija(localStorage.getItem("diseminacija2026To2027") || "");
    setOstalo(localStorage.getItem("ostalo2026To2027") || "");
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
  const debouncedSave = debounce(saveToLocalStorage, 1000);

  // Handler za promjene teksta koji koristi debounce
  const handleTextChange = (setterFunction, localStorageKey) => (event) => {
    const newText = event.target.value;
    setterFunction(newText);
    debouncedSave(localStorageKey, newText);
  };

  return (
    <div>
      <h2>Informacije za 2026. - 2027. godinu</h2>
      <textarea
        value={mobilnostiNastavnika}
        onChange={handleTextChange(
          setMobilnostiNastavnika,
          "mobilnostiNastavnika2026To2027"
        )}
      />
      <textarea
        value={mobilnostiUcenika}
        onChange={handleTextChange(
          setMobilnostiUcenika,
          "mobilnostiUcenika2026To2027"
        )}
      />
      <textarea
        value={jobShadowing}
        onChange={handleTextChange(setJobShadowing, "jobShadowing2026To2027")}
      />
      <textarea
        value={aktivnosti}
        onChange={handleTextChange(setAktivnosti, "aktivnosti2026To2027")}
      />
      <textarea
        value={diseminacija}
        onChange={handleTextChange(setDiseminacija, "diseminacija2026To2027")}
      />
      <textarea
        value={ostalo}
        onChange={handleTextChange(setOstalo, "ostalo2026To2027")}
      />
    </div>
  );
};

export default Year2026To2027;
