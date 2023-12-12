import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from 'axios'; // Uvoz Axiosa

const Španjolska = () => {
  const [podatci, setPodatci] = useState("");
  const initialDokumentacijaState = () => {
    return Array.from({ length: 15 }, (_, index) => {
      const savedData = localStorage.getItem(`španjolskaDokumentacija${index}`);
      return savedData ? JSON.parse(savedData) : { tekst: "", checked: false };
    });
  };
  const [dokumentacija, setDokumentacija] = useState(initialDokumentacijaState);

  useEffect(() => {
    // Dohvaćanje podataka iz API-ja kada se komponenta montira
    fetchDataFromAPI();
  }, []);

  // Funkcija za dohvaćanje podataka putem Axiosa
  const fetchDataFromAPI = () => {
    axios.get("postgres://lwgxcprfmhnbvu:ce5f1bd0c0be2c340304a7cc4cc1ac660daef0f08851f05b510e4dfe4267c58b@ec2-3-232-218-211.compute-1.amazonaws.com:5432/de7qfcf7mujcbl") // Zamijenite 'your-endpoint' s pravim API endpointom
      .then((response) => {
        // Ažurirajte stanje komponente s podacima iz odgovora
        setPodatci(response.data.podatci);
        setDokumentacija(response.data.dokumentacija);
      })
      .catch((error) => {
        // Tretirajte greške
        console.error(error);
      });
  };

  // Debounced verzija funkcije za spremanje
  const debouncedSave = debounce((localStorageKey, value) => {
    localStorage.setItem(localStorageKey, value);
  }, 300);

  const handlePodatciChange = (event) => {
    const newText = event.target.value;
    setPodatci(newText);
    debouncedSave("španjolskaPodatci", newText);
  };

  const handleDokumentacijaTextChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = {
      ...newDokumentacija[index],
      tekst: event.target.value,
    };
    setDokumentacija(newDokumentacija);
    debouncedSave(
      `španjolskaDokumentacija${index}`,
      JSON.stringify(newDokumentacija[index])
    );
  };

  const handleDokumentacijaCheckboxChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = {
      ...newDokumentacija[index],
      checked: event.target.checked,
    };
    setDokumentacija(newDokumentacija);
    debouncedSave(
      `španjolskaDokumentacija${index}`,
      JSON.stringify(newDokumentacija[index])
    );
  };

  return (
    <div className="container">
      <h1 style={{ color: "blue" }}>Španjolska</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Podatci</th>
            <td>
              <textarea
                className="form-control"
                value={podatci}
                onChange={handlePodatciChange}
                rows="20" // Postavljanje broja redova na 20
              />
            </td>
          </tr>
          {dokumentacija.map((item, index) => (
            <tr key={index}>
              <th>Dokumentacija {index + 1}</th>
              <td>
                <textarea
                  className="form-control"
                  value={item.tekst}
                  onChange={handleDokumentacijaTextChange(index)}
                  style={{
                    backgroundColor: item.checked ? "lightgreen" : "white",
                  }}
                />
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={handleDokumentacijaCheckboxChange(index)}
                  className="mt-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Španjolska;
