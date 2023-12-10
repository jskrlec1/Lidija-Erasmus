import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Year2023To2024 = () => {
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");

  useEffect(() => {
    setJobShadowing(localStorage.getItem("jobShadowing2023To2024") || "");
    setAktivnosti(localStorage.getItem("aktivnosti2023To2024") || "");
    setDiseminacija(localStorage.getItem("diseminacija2023To2024") || "");
    setOstalo(localStorage.getItem("ostalo2023To2024") || "");
  }, []);

  const handleTextChange = (setterFunction, localStorageKey) => (event) => {
    const newText = event.target.value;
    setterFunction(newText);
    localStorage.setItem(localStorageKey, newText);
  };

  const navigate = useNavigate();

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
              <button className="btn btn-primary"
              onClick={handleRimClick}>Rim</button>
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
              <button className="btn btn-primary"
              onClick={handleItalijaClick}>Italija</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Job shadowing</th>
            <td>
              <textarea
                className="form-control"
                value={jobShadowing}
                onChange={handleTextChange(
                  setJobShadowing,
                  "jobShadowing2023To2024"
                )}
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
                onChange={handleTextChange(
                  setAktivnosti,
                  "aktivnosti2023To2024"
                )}
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
                onChange={handleTextChange(
                  setDiseminacija,
                  "diseminacija2023To2024"
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Ostalo</th>
            <td>
              <textarea
                className="form-control"
                value={ostalo}
                onChange={handleTextChange(setOstalo, "ostalo2023To2024")}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Year2023To2024;
