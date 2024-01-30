import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Tenerife = () => {
  const [podatci, setPodatci] = useState("");
  const [dokumentacija, setDokumentacija] = useState(Array.from({ length: 15 }, () => ({ tekst: "", checked: false })));
  const docRef = doc(db, "tenerife", "uniqueDocumentId"); // Fiksni ID za dokument

  const fetchDataFromAPI = async () => {
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPodatci(data.podatci);
        setDokumentacija(data.dokumentacija);
      } else {
        console.log("Nema pronađenih podataka!");
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const saveDataToServer = async () => {
    try {
      await setDoc(docRef, {
        podatci,
        dokumentacija,
      });
      console.log("Podaci su uspješno spremljeni u Firestore.");
    } catch (error) {
      console.error("Greška pri spremanju podataka u Firestore:", error);
    }
  };

  const handlePodatciChange = (event) => {
    const newText = event.target.value;
    setPodatci(newText);
  };

  const handleDokumentacijaTextChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = {
      ...newDokumentacija[index],
      tekst: event.target.value,
    };
    setDokumentacija(newDokumentacija);
  };

  const handleDokumentacijaCheckboxChange = (index) => (event) => {
    const newDokumentacija = [...dokumentacija];
    newDokumentacija[index] = {
      ...newDokumentacija[index],
      checked: event.target.checked,
    };
    setDokumentacija(newDokumentacija);
  };

  return (
    <div className="container">
      <h1 style={{ color: "blue" }}>Tenerife</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Podatci</th>
            <td>
              <textarea
                className="form-control"
                value={podatci}
                onChange={handlePodatciChange}
                rows="20"
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
                  rows="5"
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
      <button className="btn btn-primary" onClick={saveDataToServer}>Spremi podatke na poslužitelj</button>
    </div>
  );
};

export default Tenerife;
