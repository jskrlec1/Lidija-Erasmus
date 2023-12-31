// import React, { useState, useEffect } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";

// const Tenerife = () => {
//   const [podatci, setPodatci] = useState("");
//   const initialDokumentacijaState = () => {
//     return Array.from({ length: 15 }, (_, index) => {
//       const savedData = localStorage.getItem(`tenerifeDokumentacija${index}`);
//       return savedData ? JSON.parse(savedData) : { tekst: "", checked: false };
//     });
//   };
//   const [dokumentacija, setDokumentacija] = useState(initialDokumentacijaState);

//   useEffect(() => {
//     // Provera LocalStorage-a za sačuvane podatke u "Podatci" polju
//     const savedPodatci = localStorage.getItem("tenerifePodatci");
//     if (savedPodatci) {
//       setPodatci(savedPodatci);
//     } else {
//       // Ako nema sačuvanih podataka, dohvati ih sa servera
//       fetchDataFromAPI();
//     }
//   }, []);

//   // Funkcija za dohvaćanje podataka putem Axiosa
//   const fetchDataFromAPI = () => {
//     axios
//       .get("") // Zamijenite sa stvarnim endpointom
//       .then((response) => {
//         // Ažurirajte stanje komponente s podacima iz odgovora
//         setPodatci(response.data.podatci);
//         setDokumentacija(response.data.dokumentacija);
//       })
//       .catch((error) => {
//         // Tretirajte greške
//         console.error(error);
//       });
//   };

//   // Debounced verzija funkcije za spremanje
//   const debouncedSave = debounce((localStorageKey, value) => {
//     localStorage.setItem(localStorageKey, value);
//     console.log(
//       `Podaci sačuvani u LocalStorage pod ključem ${localStorageKey}:`,
//       value
//     );
//   }, 300);

//   const handlePodatciChange = (event) => {
//     const newText = event.target.value;
//     setPodatci(newText);
//     debouncedSave("tenerifePodatci", newText); // Spremanje u localStorage
//   };

//   const handleDokumentacijaTextChange = (index) => (event) => {
//     const newDokumentacija = [...dokumentacija];
//     newDokumentacija[index] = {
//       ...newDokumentacija[index],
//       tekst: event.target.value,
//     };
//     setDokumentacija(newDokumentacija);
//     debouncedSave(
//       `tenerifeDokumentacija${index}`,
//       JSON.stringify(newDokumentacija[index])
//     );
//   };

//   const handleDokumentacijaCheckboxChange = (index) => (event) => {
//     const newDokumentacija = [...dokumentacija];
//     newDokumentacija[index] = {
//       ...newDokumentacija[index],
//       checked: event.target.checked,
//     };
//     setDokumentacija(newDokumentacija);
//     debouncedSave(
//       `tenerifeDokumentacija${index}`,
//       JSON.stringify(newDokumentacija[index])
//     );
//   };

//   return (
//     <div className="container">
      
//       <h1 style={{ color: "blue" }}>Tenerife</h1>
//       <table className="table">
//         <tbody>
//           <tr>
//             <th>Podatci</th>
//             <td>
//               <textarea
//                 className="form-control"
//                 value={podatci}
//                 onChange={handlePodatciChange}
//                 rows="20"
//               />
//             </td>
//           </tr>
//           {dokumentacija.map((item, index) => (
//             <tr key={index}>
//               <th>Dokumentacija {index + 1}</th>
//               <td>
//                 <textarea
//                   className="form-control"
//                   value={item.tekst}
//                   onChange={handleDokumentacijaTextChange(index)}
//                   style={{
//                     backgroundColor: item.checked ? "lightgreen" : "white",
//                   }}
//                 />
//                 <input
//                   type="checkbox"
//                   checked={item.checked}
//                   onChange={handleDokumentacijaCheckboxChange(index)}
//                   className="mt-2"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tenerife;




import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const Tenerife = () => {
  const [podatci, setPodatci] = useState("");
  const [dokumentacija, setDokumentacija] = useState([]);

  // Debounced verzija funkcije za spremanje u datoteku
  const debouncedSaveToTextFile = debounce((text) => {
    axios
      .post("/spremi-podatke", { podatci: text })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 300);

  useEffect(() => {
    // Dohvati podatke sa servera
    fetchDataFromAPI();
  }, []);

  // Funkcija za dohvaćanje podataka putem Axiosa
  const fetchDataFromAPI = () => {
    axios
      .get("/dohvati-podatke")
      .then((response) => {
        setPodatci(response.data.podatci);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePodatciChange = (event) => {
    const newText = event.target.value;
    setPodatci(newText);
    debouncedSaveToTextFile(newText); // Spremanje u datoteku
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

export default Tenerife;

