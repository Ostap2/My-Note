import { useState, useEffect } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Input from "./components/InputCard";
import Textarea from "./components/Textarea";

import './styles/global.css';
import './styles/App.css';
import './styles/Card.css';
import './styles/Modal.css';
import './styles/Button.css';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [checkboxes, setCheckboxes] = useState([]); 


  const addCheckbox = () => {
    setCheckboxes([...checkboxes, { label: "", checked: false }]);
  };


  const removeCheckbox = (index) => {
    const newCheckboxes = checkboxes.filter((_, idx) => idx !== index);
    setCheckboxes(newCheckboxes);
  };


  const handleCheckboxChange = (index, value, checked) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = { label: value, checked };
    setCheckboxes(newCheckboxes);
  };


  const addNote = () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now(),
        title,
        content,
        checkboxes: checkboxes.filter(checkbox => checkbox.label.trim() !== ""),
      };
      setNotes([...notes, newNote]);
      setTitle(""); 
      setContent("");
      setCheckboxes([]); 
      setModalOpen(false); 

 
      localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    }
  };


  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    setModalView(null); 

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };


  const loadNotes = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  };


  const loadCheckboxes = () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      const lastNote = storedNotes[storedNotes.length - 1]; 
      if (lastNote && lastNote.checkboxes) {
        setCheckboxes(lastNote.checkboxes);
      }
    }
  };


  useEffect(() => {
    loadNotes();
    loadCheckboxes();
  }, []);


  const handleCheckboxStateChange = (index, checked) => {
    const newCheckboxes = [...modalView.checkboxes];
    newCheckboxes[index].checked = checked;
    setModalView({ ...modalView, checkboxes: newCheckboxes });

  
    const updatedNotes = notes.map((note) => 
      note.id === modalView.id ? { ...note, checkboxes: newCheckboxes } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold logo">My Notes</h1>
        <Button onClick={() => setModalOpen(true)} className="button-add-note">Add Note</Button>
      </header>


      {notes.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-center text-gray-500">
          <p>No notes available. Add a new note to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card
              key={note.id}
              title={note.title}
              description={note.content.substring(0, 100)} 
              className="cursor-pointer p-4"
              onClick={() => setModalView(note)}
            />
          ))}
        </div>
      )}


      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">New Note</h2>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 mb-4"
        />


        <div className="mb-4">
          <h3 className="">Checkboxes</h3>
          {checkboxes.map((checkbox, index) => (
            <div key={index} className="">
              <input
                type="text"
                value={checkbox.label || ""} 
                onChange={(e) => handleCheckboxChange(index, e.target.value, checkbox.checked)}
                placeholder={`Checkbox ${index + 1}`}
                className="border p-2 rounded mr-2 input-checkboxes"
              />
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeCheckbox(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500"
            onClick={addCheckbox}
          >
            Add Checkbox
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModalOpen(false)} className="cancel">Cancel</Button>
          <Button onClick={addNote}>Save</Button>
        </div>
      </Modal>


      {modalView && (
        <Modal isOpen={true} onClose={() => setModalView(null)}>
          <h2 className="text-xl font-semibold mb-4">{modalView.title}</h2>

          <p className="mb-4">{modalView.content}</p>

          <div className="mt-2">
            {modalView.checkboxes.map((checkbox, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={checkbox.checked}
                  onChange={(e) => handleCheckboxStateChange(index, e.target.checked)}
                />
                <label htmlFor={`checkbox-${index}`} className="ml-2">
                  {checkbox.label}
                </label>
              </div>
            ))}
          </div>
          <Button variant="destructive" onClick={() => deleteNote(modalView.id)} className="Delete">Delete</Button>
        </Modal>
      )}
    </div>
  );
}
