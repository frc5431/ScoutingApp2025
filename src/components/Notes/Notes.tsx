import React, { useRef, useState, useEffect } from "react";
import { defineConfig } from "vite";
import './Notes.css';

export interface notesProps {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const Notes: React.FC<notesProps> = ({ notes, setNotes, placeholder }: notesProps) => {
  const [revealNotes, setRevealNotes] = useState(false);
  const toggleRevealNotes = () => {
    setRevealNotes((prev) => !prev);
  };

  return (
    <>
      {!revealNotes && <button onClick={toggleRevealNotes} style={{fontSize:'1.4em', backgroundColor:'#222222'}}>Notes</button>}

      {revealNotes && (
        <div className="notes-overlay">
          <h3>Put your notes in the box below!</h3>
          <textarea className="notesbox" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={placeholder}></textarea>
          <button onClick={toggleRevealNotes} className="exitnotesboxbutton">
            EXIT
          </button>
        </div>
      )}
    </>
  );
};

export default Notes;
