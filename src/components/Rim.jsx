import React, { useState, useEffect } from "react";

const Rim = () => {
  const [podatci, setPodatci] = useState(localStorage.getItem("rimPodatci") || "");
  const initialDokumentacijaState = () => {
    return Array.from({ length: 15 }, (_, index) => {
      const savedData = localStorage.getItem(`rimDokumentacija${index}`);
      return savedData ? JSON.parse(savedData) : { tekst: "", checked: false };
    });
  };
  const [dokumentacija, setDokumentacija] = useState(initialDokumentacijaState);

  useEffect(() => {
    localStorage.setItem("rimPodatci", podatci);
  }, [podatci]);

  useEffect(() => {
    dokumentacija.forEach((item, index) => {
      localStorage.setItem(`rimDokumentacija${index}`, JSON.stringify(item));
    });
  }, [dokumentacija]);

  const handlePodatciChange = (event) => {
    setPodatci(event.target.value);
  };

  const handleDokumentacijaTextChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = { ...newDokumentacija[index], tekst: event.target.value };
    setDokumentacija(newDokumentacija);
  };

  const handleDokumentacijaCheckboxChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = { ...newDokumentacija[index], checked: event.target.checked };
    setDokumentacija(newDokumentacija);
  };

  return (
    <div className="container">
      <h1 style={{ color: 'blue' }}>Rim</h1> 
      <table className="table">
        <tbody>
          <tr>
            <th>Podatci</th>
            <td>
              <textarea
                className="form-control"
                value={podatci}
                onChange={handlePodatciChange}
                rows="20"  // Postavljanje broja redova na 20
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
                  style={{ backgroundColor: item.checked ? "lightgreen" : "white" }}
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

export default Rim;