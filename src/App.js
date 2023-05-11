import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import Note from "./components/Note/Note";

function App() {
  const [notes, setNotes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <aside className="Side">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {filteredNotes &&
          filteredNotes.map((note) => (
            <Link to={`/notes/${note.id}`} className="Note-link">
              {note.title}
            </Link>
          ))}
      </aside>
      <main className="Main">
        <Routes>
          <Route path="/notes/:id" element={<Note onSave={fetchNotes} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;