// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import debounce from "lodash/debounce"; // Uvoz debounce funkcije iz lodash paketa
// import axios from "axios"; // Uvoz Axios za slanje HTTP zahtjeva
// import { db } from "./firebaseConfig";
// import { auth } from "./firebaseConfig";

// const Year2023To2024 = () => {
//   const [jobShadowing, setJobShadowing] = useState("");
//   const [aktivnosti, setAktivnosti] = useState("");
//   const [diseminacija, setDiseminacija] = useState("");
//   const [ostalo, setOstalo] = useState("");

//   const navigate = useNavigate();

//   const fetchDataFromAPI = () => {
//     // Simulacija podataka s servera
//     const fakeApiResponse = {
//       jobShadowing: "Job Shadowing podaci",
//       aktivnosti: "Aktivnosti podaci",
//       diseminacija: "Diseminacija podaci",
//       ostalo: "Ostalo podaci",
//     };

//     // Ažuriranje stanja komponente s podacima
//     setJobShadowing(fakeApiResponse.jobShadowing);
//     setAktivnosti(fakeApiResponse.aktivnosti);
//     setDiseminacija(fakeApiResponse.diseminacija);
//     setOstalo(fakeApiResponse.ostalo);
//   };

//   useEffect(() => {
//     // Dohvaćanje podataka iz API-ja kada se komponenta montira
//     fetchDataFromAPI();
//   }, []);

//   const handleTextChange = (setterFunction, localStorageKey) => {
//     return debounce((newText) => {
//       setterFunction(newText);
//       localStorage.setItem(localStorageKey, newText);
//     }, 10); // Smanjen debounce delay na 10ms
//   };

//   const saveDataToServer = () => {
//     // Slanje podataka na poslužitelj
//     axios
//       .post("/api/save-data", {
//         jobShadowing,
//         aktivnosti,
//         diseminacija,
//         ostalo,
//       })
//       .then((response) => {
//         console.log("Podaci su uspješno spremljeni na poslužitelju.");
//       })
//       .catch((error) => {
//         console.error("Greška pri spremanju podataka:", error);
//       });
//   };

//   // Dohvaćanje podataka iz Local Storage prilikom prvog renderiranja
//   useEffect(() => {
//     const savedJobShadowing =
//       localStorage.getItem("jobShadowing2023To2024") || "";
//     const savedAktivnosti = localStorage.getItem("aktivnosti2023To2024") || "";
//     const savedDiseminacija =
//       localStorage.getItem("diseminacija2023To2024") || "";
//     const savedOstalo = localStorage.getItem("ostalo2023To2024") || "";

//     setJobShadowing(savedJobShadowing);
//     setAktivnosti(savedAktivnosti);
//     setDiseminacija(savedDiseminacija);
//     setOstalo(savedOstalo);
//   }, []);

//   const handleTenerifeClick = () => {
//     navigate("/tenerife");
//   };

//   const handleBudimpeštaClick = () => {
//     navigate("/budimpešta");
//   };

//   const handleRimClick = () => {
//     navigate("/rim");
//   };

//   const handleŠpanjolskaClick = () => {
//     navigate("/španjolska");
//   };

//   const handleItalijaClick = () => {
//     navigate("/italija");
//   };

//   return (
//     <div className="text-center mt-4">
//       <h2>Informacije za 2023. - 2024. godinu</h2>
//       <table className="table">
//         <tbody>
//           <tr>
//             <th scope="row">Mobilnosti nastavnika</th>
//             <td>
//               <button
//                 className="btn btn-primary"
//                 style={{ marginRight: "20px" }}
//                 onClick={handleTenerifeClick}
//               >
//                 Tenerife
//               </button>
//               <button
//                 className="btn btn-primary"
//                 style={{ marginRight: "20px" }}
//                 onClick={handleBudimpeštaClick}
//               >
//                 Budimpešta
//               </button>
//               <button className="btn btn-primary" onClick={handleRimClick}>
//                 Rim
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Mobilnosti učenika</th>
//             <td>
//               <button
//                 className="btn btn-primary"
//                 style={{ marginRight: "20px" }}
//                 onClick={handleŠpanjolskaClick}
//               >
//                 Španjolska
//               </button>
//               <button className="btn btn-primary" onClick={handleItalijaClick}>
//                 Italija
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Job shadowing</th>
//             <td>
//               <textarea
//                 className="form-control"
//                 value={jobShadowing}
//                 onChange={(e) =>
//                   handleTextChange(
//                     setJobShadowing,
//                     "jobShadowing2023To2024"
//                   )(e.target.value)
//                 }
//               />
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Aktivnosti</th>
//             <td>
//               <textarea
//                 className="form-control"
//                 rows="20"
//                 value={aktivnosti}
//                 onChange={(e) =>
//                   handleTextChange(
//                     setAktivnosti,
//                     "aktivnosti2023To2024"
//                   )(e.target.value)
//                 }
//               />
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Diseminacija</th>
//             <td>
//               <textarea
//                 className="form-control"
//                 rows="20"
//                 value={diseminacija}
//                 onChange={(e) =>
//                   handleTextChange(
//                     setDiseminacija,
//                     "diseminacija2023To2024"
//                   )(e.target.value)
//                 }
//               />
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Ostalo</th>
//             <td>
//               <textarea
//                 className="form-control"
//                 value={ostalo}
//                 onChange={(e) =>
//                   handleTextChange(
//                     setOstalo,
//                     "ostalo2023To2024"
//                   )(e.target.value)
//                 }
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <button className="btn btn-primary" onClick={saveDataToServer}>
//         Spremi podatke na poslužitelj
//       </button>
//     </div>
//   );
// };

// export default Year2023To2024;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { db } from "./firebaseConfig";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Year2023To2024 = () => {
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  const navigate = useNavigate();

  // Dohvaćanje podataka iz Firestore
  const fetchDataFromAPI = async () => {
    const q = query(collection(db, "year2023To2024"), where("id", "==", "uniqueDocumentId"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setJobShadowing(data.jobShadowing);
      setAktivnosti(data.aktivnosti);
      setDiseminacija(data.diseminacija);
      setOstalo(data.ostalo);
    });
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const saveDataToServer = async () => {
    try {
      await addDoc(collection(db, "year2023To2024"), {
        jobShadowing,
        aktivnosti,
        diseminacija,
        ostalo,
      });
      console.log("Podaci su uspješno spremljeni u Firestore.");
    } catch (error) {
      console.error("Greška pri spremanju podataka u Firestore:", error);
    }
  };

  // Navigacijske funkcije
  const handleTenerifeClick = () => {
    navigate("/tenerife");
  };

  const handleBudimpeštaClick = () => {
    navigate("/budimpešta");
  };

  const handleRimClick = () => {
    navigate("/rim");
  };

  const handleŠpanjolskaClick = () => {
    navigate("/španjolska");
  };

  const handleItalijaClick = () => {
    navigate("/italija");
  };

  return (
    <div className="text-center mt-4">
      <h2>Informacije za 2023. - 2024. godinu</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Mobilnosti nastavnika</th>
            <td>
              <button className="btn btn-primary" style={{ marginRight: "20px" }} onClick={handleTenerifeClick}>Tenerife</button>
              <button className="btn btn-primary" style={{ marginRight: "20px" }} onClick={handleBudimpeštaClick}>Budimpešta</button>
              <button className="btn btn-primary" onClick={handleRimClick}>Rim</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Mobilnosti učenika</th>
            <td>
              <button className="btn btn-primary" style={{ marginRight: "20px" }} onClick={handleŠpanjolskaClick}>Španjolska</button>
              <button className="btn btn-primary" onClick={handleItalijaClick}>Italija</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Job shadowing</th>
            <td>
              <textarea className="form-control" value={jobShadowing} onChange={(e) => setJobShadowing(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th scope="row">Aktivnosti</th>
            <td>
              <textarea className="form-control" rows="20" value={aktivnosti} onChange={(e) => setAktivnosti(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th scope="row">Diseminacija</th>
            <td>
              <textarea className="form-control" rows="20" value={diseminacija} onChange={(e) => setDiseminacija(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th scope="row">Ostalo</th>
            <td>
              <textarea className="form-control" value={ostalo} onChange={(e) => setOstalo(e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={saveDataToServer}>Spremi podatke na poslužitelj</button>
    </div>
  );
};

export default Year2023To2024;
