import React, { useState, useEffect } from "react";

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

  const handleTextChange = (setterFunction, localStorageKey) => (event) => {
    const newText = event.target.value;
    setterFunction(newText);
    localStorage.setItem(localStorageKey, newText);
  };

  return (
    <div className="text-center mt-4">
      <h2>Informacije za 2024. - 2025. godinu</h2>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Mobilnosti nastavnika</th>
            <td>
              <textarea
                className="form-control"
                value={mobilnostiNastavnika}
                onChange={handleTextChange(
                  setMobilnostiNastavnika,
                  "mobilnostiNastavnika2024To2025"
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mobilnosti učenika</th>
            <td>
              <textarea
                className="form-control"
                value={mobilnostiUcenika}
                onChange={handleTextChange(
                  setMobilnostiUcenika,
                  "mobilnostiUcenika2024To2025"
                )}
              />
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
                  "jobShadowing2024To2025"
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Aktivnosti</th>
            <td>
              <textarea
                className="form-control"
                value={aktivnosti}
                onChange={handleTextChange(
                  setAktivnosti,
                  "aktivnosti2024To2025"
                )}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Diseminacija</th>
            <td>
              <textarea
                className="form-control"
                value={diseminacija}
                onChange={handleTextChange(
                  setDiseminacija,
                  "diseminacija2024To2025"
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
                onChange={handleTextChange(setOstalo, "ostalo2024To2025")}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Year2024To2025;
