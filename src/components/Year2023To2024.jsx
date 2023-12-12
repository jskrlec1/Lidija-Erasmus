import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce"; // Uvoz debounce funkcije iz lodash paketa
import axios from 'axios';

const Year2023To2024 = () => {
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  const navigate = useNavigate();

  // Funkcija za dohvaćanje podataka putem Axiosa
  const fetchDataFromAPI = () => {
    axios.get("postgres://lwgxcprfmhnbvu:ce5f1bd0c0be2c340304a7cc4cc1ac660daef0f08851f05b510e4dfe4267c58b@ec2-3-232-218-211.compute-1.amazonaws.com:5432/de7qfcf7mujcbl") // Zamijenite 'your-endpoint' s pravim API endpointom
      .then((response) => {
        // Ažurirajte stanje komponente s podacima iz odgovora
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

  const handleTextChange = (setterFunction, localStorageKey) => {
    return debounce((newText) => {
      setterFunction(newText);
      localStorage.setItem(localStorageKey, newText);
    }, 300);
  };

  const handleTenerifeClick = () => {
    navigate("/tenerife");
  };
  const handleRimClick = () => {
    navigate("/rim");
  };
  const handleBudimpeštaClick = () => {
    navigate("/budimpešta");
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
                onChange={(e) =>
                  handleTextChange(setJobShadowing, "jobShadowing2023To2024")(
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  handleTextChange(setAktivnosti, "aktivnosti2023To2024")(
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  handleTextChange(setDiseminacija, "diseminacija2023To2024")(
                    e.target.value
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Ostalo</th>
            <td>
              <textarea
                className="form-control"
                value={ostalo}
                onChange={(e) =>
                  handleTextChange(setOstalo, "ostalo2023To2024")(e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Year2023To2024;
