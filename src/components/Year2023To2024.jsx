import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Year2023To2024 = () => {
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  const navigate = useNavigate();
  const docRef = doc(db, "year2023To2024", "uniqueDocumentId"); // Fiksni ID za dokument

  const fetchDataFromAPI = async () => {
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setJobShadowing(data.jobShadowing);
        setAktivnosti(data.aktivnosti);
        setDiseminacija(data.diseminacija);
        setOstalo(data.ostalo);
      } else {
        console.log("Nema pronađenih podataka!");
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
    // eslint-disable-next-line
  }, []);

  const saveDataToServer = async () => {
    try {
      await setDoc(docRef, {
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
              <button
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
                onClick={handleTenerifeClick}
              >
                Tenerife
              </button>
              <button
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
                onClick={handleBudimpeštaClick}
              >
                Budimpešta
              </button>
              <button className="btn btn-primary" onClick={handleRimClick}>
                Rim
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">Mobilnosti učenika</th>
            <td>
              <button
                className="btn btn-primary"
                style={{ marginRight: "20px" }}
                onClick={handleŠpanjolskaClick}
              >
                Španjolska
              </button>
              <button className="btn btn-primary" onClick={handleItalijaClick}>
                Italija
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">Job shadowing</th>
            <td>
              <textarea
                className="form-control"
                value={jobShadowing}
                onChange={(e) => setJobShadowing(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Aktivnosti</th>
            <td>
              <textarea
                className="form-control"
                rows="20"
                value={aktivnosti}
                onChange={(e) => setAktivnosti(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Diseminacija</th>
            <td>
              <textarea
                className="form-control"
                rows="20"
                value={diseminacija}
                onChange={(e) => setDiseminacija(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Ostalo</th>
            <td>
              <textarea
                className="form-control"
                value={ostalo}
                onChange={(e) => setOstalo(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={saveDataToServer}>
        Spremi podatke na poslužitelj
      </button>
    </div>
  );
};

export default Year2023To2024;
