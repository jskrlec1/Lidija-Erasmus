import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useDropzone } from "react-dropzone";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Year2023To2024 = () => {
  const [jobShadowing, setJobShadowing] = useState("");
  const [aktivnosti, setAktivnosti] = useState("");
  const [diseminacija, setDiseminacija] = useState("");
  const [ostalo, setOstalo] = useState("");
  const [documents, setDocuments] = useState([]);

  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const docRef = doc(db, "year2023To2024", "uniqueDocumentId");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setJobShadowing(data.jobShadowing || "");
        setAktivnosti(data.aktivnosti || "");
        setDiseminacija(data.diseminacija || "");
        setOstalo(data.ostalo || "");
      } else {
        console.log("No data found!");
      }

      const documentsRef = collection(db, "documentsMetadata");
      const querySnapshot = await getDocs(documentsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docs);
    };

    fetchDataFromFirestore();
  }, []);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const storageRef = ref(storage, `year2023To2024/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const documentMetadata = { name: file.name, url: url };

    const docRef = await addDoc(
      collection(db, "documentsMetadata"),
      documentMetadata
    );
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { ...documentMetadata, id: docRef.id },
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const saveData = async () => {
    const docRef = doc(db, "year2023To2024", "uniqueDocumentId");
    try {
      await setDoc(docRef, {
        jobShadowing,
        aktivnosti,
        diseminacija,
        ostalo,
      });
      console.log("Data successfully saved to Firestore.");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };

  const deleteDocument = async (document) => {
    const storageRef = ref(storage, `year2023To2024/${document.name}`);
    try {
      await deleteObject(storageRef);
      await deleteDoc(doc(db, "documentsMetadata", document.id));
      setDocuments(documents.filter((doc) => doc.id !== document.id));
    } catch (error) {
      console.error("Error during document deletion:", error);
    }
  };

  const renderDocumentsTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Naziv dokumenta</th>
          <th>Radnja</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document, index) => (
          <tr key={index}>
            <td>{document.name}</td>
            <td>
              <a
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Otvori
              </a>{" "}
              <button
                onClick={() => deleteDocument(document)}
                className="btn btn-danger"
              >
                Obriši
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const [textareaRows] = useState(7);
  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <button className="btn btn-danger" onClick={saveData}>
          Sačuvaj podatke
        </button>
      </div>
      <br />
      <h1 className="text-center mb-3">Informacije za 2023. - 2024. godinu</h1>
      <hr />
      <div className="text-center mb-3">
        <h4>Mobilnosti nastavnika:</h4>
        <br />
        <button
          onClick={() => navigate("/tenerife")}
          className="btn btn-primary rounded-pill mr-2"
          style={{ marginRight: "20px" }}
        >
          Tenerife
        </button>
        <button
          onClick={() => navigate("/budimpešta")}
          className="btn btn-primary rounded-pill mr-2"
          style={{ marginRight: "20px" }}
        >
          Budimpešta
        </button>
        <button
          onClick={() => navigate("/rim")}
          className="btn btn-primary rounded-pill mr-2"
        >
          Rim
        </button>
      </div>
      <hr />
      <div className="text-center mb-3">
        <h4>Mobilnosti učenika:</h4>
        <br />
        <button
          onClick={() => navigate("/španjolska")}
          className="btn btn-primary rounded-pill mr-2"
          style={{ marginRight: "20px" }}
        >
          Španjolska
        </button>
        <button
          onClick={() => navigate("/italija")}
          className="btn btn-primary rounded-pill"
        >
          Italija
        </button>
      </div>
      <hr />
      <div className="mb-3">
        <label>
          {" "}
          <h5>Job shadowing:</h5>
        </label>
        <textarea
          className="form-control"
          rows={textareaRows}
          value={jobShadowing}
          onChange={(e) => setJobShadowing(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label>
          {" "}
          <h5>Aktivnosti:</h5>
        </label>
        <textarea
          className="form-control"
          rows={textareaRows}
          value={aktivnosti}
          onChange={(e) => setAktivnosti(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label>
          {" "}
          <h5>Diseminacija:</h5>
        </label>
        <textarea
          className="form-control"
          rows={textareaRows}
          value={diseminacija}
          onChange={(e) => setDiseminacija(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label>
          {" "}
          <h5>Ostalo:</h5>
        </label>
        <textarea
          className="form-control"
          rows={textareaRows}
          value={ostalo}
          onChange={(e) => setOstalo(e.target.value)}
        ></textarea>
      </div>

      {/* Drag-and-Drop sekcija i tablica s dokumentima na dnu */}
      <div {...getRootProps()} className="custom-dropzone">
        <input {...getInputProps()} />
        <h6>+ Dovuci ili klikni da priložiš dokumente</h6>
      </div>
      {documents.length > 0 && renderDocumentsTable()}
    </div>
  );
};

export default Year2023To2024;
