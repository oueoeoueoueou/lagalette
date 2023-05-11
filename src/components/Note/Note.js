import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./Note.css";

const Note = ({ onSave }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const fetchNote = useCallback(async () => {
    const response = await fetch(`/notes/${id}`);
    const result = await response.json();
    setNote(result);
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    onSave();
  };

  const handeDelete = async (event) => {
    event.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note?")) {
    await fetch(`/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    onSave();
    navigate("/");
     }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        className="Note-editable Note-title"
        type="text"
        value={note ? note.title : ""}
        onChange={(event) => {
          setNote({ ...note, title: event.target.value });
        }}
      />
      <textarea
        className="Note-editable Note-content" onSubmit={handleSubmit}
        value={note ? note.content : ""}
        onChange={(event) => {
          setNote({ ...note, content: event.target.value });
        }}
      />
      <div className="Note-actions ">
        <button className="Button" onClick={handleSubmit}>
          Enregistrer
        </button>
        <button className="Button" onClick={handeDelete}>
          Supprimer
        </button>
      </div>
    </form>
  );
};

export default Note;